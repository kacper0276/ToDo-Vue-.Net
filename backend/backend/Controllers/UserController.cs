﻿using backend.Entities;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User?>> CreateUser([FromBody] User user)
        {
            var createdUser = await _userService.RegisterUser(user);
            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Item.Id }, createdUser.Item);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User?>> Login([FromBody] LoginRequest loginRequest)
        {
            var user = await _userService.LoginAsync(loginRequest.Email, loginRequest.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<LoginResponse?>> RefreshToken([FromBody] string refreshToken)
        {
            var response = await _userService.RefreshTokenAsync(refreshToken);
            if (response == null)
            {
                return Unauthorized();
            }

            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userService.DeleteUserAsync(id);
            return NoContent();
        }

        [HttpGet("search/{phrase}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersByLoginPhrase(string phrase)
        {
            var users = await _userService.GetUsersByLoginPhraseAsync(phrase);

            if (users == null || !users.Items.Any())
            {
                return NotFound("No users found matching the given phrase");
            }

            return Ok(users);
        }

        [HttpGet("find-by-login/{login}")]
        public async Task<ActionResult<User?>> GetUserByLogin(string login)
        {
            var user = await _userService.GetUserByLoginAsync(login);

            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (int.TryParse(userIdString, out int userId))
            {
                var user = await _userService.GetUserByIdAsync(userId);

                if (user != null)
                {
                    return Ok(new UserDto
                    {
                        Id = user.Item.Id,
                        Email = user.Item.Email,
                        Login = user.Item.Login,
                        Role = user.Item.Role
                    });
                }
                return NotFound("User not found");
            }
            return BadRequest("Invalid user ID");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (id != updatedUser.Id)
            {
                return BadRequest("ID in the URL does not match the ID in the request body.");
            }

            var response = await _userService.UpdateUserAsync(id, updatedUser);

            if (response.Item == null)
            {
                return NotFound(response.Item);
            }

            return Ok(response.Item);
        }
    }
}
