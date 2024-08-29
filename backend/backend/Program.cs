
using backend.Entities;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // JWT
            var authenticationSettings = new AuthenticationSettings();
            builder.Configuration.GetSection("Authentication").Bind(authenticationSettings);

            // Add services to the container.
            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("FrontEndClient", policyBuilder =>
                policyBuilder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowAnyOrigin()
                );
            });

            // Services
            builder.Services.AddScoped<IToDoService, ToDoService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IJwtService, JwtService>();

            builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

            // Configure authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Authentication:JwtIssuer"],
                    ValidAudience = builder.Configuration["Authentication:JwtIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Authentication:JwtKey"])),
                    ClockSkew = TimeSpan.Zero
                };
            });

            // Add authorization policies
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminOnly", policy => policy.RequireRole("ADMIN"));
                options.AddPolicy("UserOnly", policy => policy.RequireRole("USER"));
                options.AddPolicy("GuestOnly", policy => policy.RequireRole("GUEST"));
                options.AddPolicy("AdminOrUser", policy => policy.RequireRole("ADMIN", "USER"));
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // CORS
            app.UseCors("FrontEndClient");

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            // Enable WebSockets
            app.UseWebSockets();

            // Add WebSocket handling endpoint
            var webSocketServer = new WebSocketServer();
            app.Map("/ws", async context =>
            {
                await webSocketServer.HandleWebSocketConnection(context);
            });

            app.MapControllers();

            app.Run();
        }
    }
}
