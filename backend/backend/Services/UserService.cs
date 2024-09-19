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
        Task<ListResponse<User>> GetAllUsersAsync();
        Task<SimpleResponse<User>> GetUserByIdAsync(int id);
        Task<SimpleResponse<User>> GetUserByLoginAsync(string login);
        Task<ListResponse<User>> GetUsersByLoginPhraseAsync(string phrase);
        Task<SimpleResponse<User>> RegisterUser(User user);
        Task<SimpleResponse<LoginResponse?>> LoginAsync(string email, string password);
        Task<SimpleResponse<LoginResponse?>> RefreshTokenAsync(string refreshToken);
        Task<SimpleResponse<User>> UpdateUserAsync(int id, User user);
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

        public async Task<ListResponse<User>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            return new ListResponse<User> { Items = users };
        }

        public async Task<SimpleResponse<User>> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return new SimpleResponse<User> { Item = user };
        }

        public async Task<SimpleResponse<User>> GetUserByLoginAsync(string login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Login == login);
            return new SimpleResponse<User> { Item = user };
        }

        public async Task<ListResponse<User>> GetUsersByLoginPhraseAsync(string phrase)
        {
            var users = await _context.Users
                .Where(u => u.Login.Contains(phrase))
                .ToListAsync();

            return new ListResponse<User> { Items = users };
        }

        public async Task<SimpleResponse<User>> RegisterUser(User user)
        {
            user.Password = _passwordHasher.HashPassword(user, user.Password);
            user.Role = "USER";
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new SimpleResponse<User> { Item = user };
        }

        public async Task<SimpleResponse<LoginResponse?>> LoginAsync(string email, string password)
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

            var response = new LoginResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken,
                User = new UserDto { Id = user.Id, Email = user.Email, Login = user.Login, Role = user.Role }
            };


            return new SimpleResponse<LoginResponse?> { Item = response };
        }

        public async Task<SimpleResponse<LoginResponse?>> RefreshTokenAsync(string refreshToken)
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

            var response = new LoginResponse
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken,
                User = new UserDto { Id = user.Id, Email = user.Email, Login = user.Login, Role = user.Role }
            };

            return new SimpleResponse<LoginResponse?> { Item = response };
        }

        public async Task<SimpleResponse<User>> UpdateUserAsync(int id, User updatedUserData)
        {
            Console.WriteLine(updatedUserData);
            
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return new SimpleResponse<User> { Item = null };
            }

            if (!string.IsNullOrEmpty(updatedUserData.Email))
            {
                user.Email = updatedUserData.Email;
            }

            if (!string.IsNullOrEmpty(updatedUserData.Login))
            {
                user.Login = updatedUserData.Login;
            }

            if (!string.IsNullOrEmpty(updatedUserData.Role))
            {
                user.Role = updatedUserData.Role;
            }

            if (!string.IsNullOrEmpty(updatedUserData.Password))
            {
                user.Password = _passwordHasher.HashPassword(user, updatedUserData.Password);
            }

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return new SimpleResponse<User> { Item = user };
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
