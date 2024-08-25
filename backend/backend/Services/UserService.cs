using backend.Entities;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<User> RegisterUser(User user);
        Task<LoginResponse?> LoginAsync(string email, string password);
        Task<LoginResponse?> RefreshTokenAsync(string refreshToken);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
    }

    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IJwtService _jwtService;
        private readonly IConfiguration _configuration;

        public UserService(ApplicationDbContext context, IPasswordHasher<User> passwordHasher, IJwtService jwtService, IConfiguration configuration)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _jwtService = jwtService;
            _configuration = configuration;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id) ?? null;
        }

        public async Task<User> RegisterUser(User user)
        {
            user.Password = _passwordHasher.HashPassword(user, user.Password);

            user.Role = "USER";
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<LoginResponse?> LoginAsync(string email, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return null;
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
            if (result == PasswordVerificationResult.Failed)
            {
                return null;
            }

            var accessToken = _jwtService.GenerateToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken(user);

            return new LoginResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken,
                User = new UserDto { Email = user.Email, Login = user.Login, Role = user.Role }
            };
        }

        public async Task<LoginResponse?> RefreshTokenAsync(string refreshToken)
        {
            if (!_jwtService.ValidateRefreshToken(refreshToken))
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Authentication:JwtKey"]);
            var principal = tokenHandler.ValidateToken(refreshToken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = _configuration["Authentication:JwtIssuer"],
                ValidAudience = _configuration["Authentication:JwtIssuer"],
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var userId = principal.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var user = await _context.Users.FindAsync(int.Parse(userId));

            if (user == null)
            {
                return null;
            }

            var newAccessToken = _jwtService.GenerateToken(user);
            var newRefreshToken = _jwtService.GenerateRefreshToken(user);

            return new LoginResponse
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken,
                User = new UserDto { Email = user.Email, Login = user.Login, Role = user.Role }
            };
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }
    }
}
