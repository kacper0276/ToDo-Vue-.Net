namespace backend.Models
{
    public class LoginResponse
    {
        public required string Token { get; set; }
        public required string RefreshToken { get; set; }
        public UserDto? User { get; set; }
    }
}
