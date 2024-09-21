using backend.Entities;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebSockets;
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

            builder.Services.AddWebSockets(options =>
            {
                options.KeepAliveInterval = TimeSpan.FromMinutes(2);
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("FrontEndClient", policyBuilder =>
                policyBuilder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowAnyOrigin()
                );
            });

            // Add EmailService
            var smtpSettings = builder.Configuration.GetSection("SmtpSettings");
            builder.Services.AddSingleton(new EmailService(
                smtpSettings["SmtpServer"],
                int.Parse(smtpSettings["SmtpPort"]),
                smtpSettings["Username"],
                smtpSettings["Password"]
            ));

            // Services
            builder.Services.AddScoped<IToDoService, ToDoService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IJwtService, JwtService>();
            builder.Services.AddScoped<IToDoGroupService, ToDoGroupService>();

            builder.Services.AddSingleton<WebSocketService>();

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

            // Add WebSocket middleware
            app.UseWebSockets();

            // Map WebSocket endpoint
            app.Map("/api/ws/connect", async context =>
            {
                var webSocketService = context.RequestServices.GetRequiredService<WebSocketService>();
                await webSocketService.HandleWebSocketConnection(context);
            });

            app.MapControllers();

            app.Run();
        }
    }
}
