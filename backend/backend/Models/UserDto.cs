namespace backend.Models
{
    public class UserDto
    {
        public int? Id { get; set; }
        public string? Email { get; set; }
        public string? Login { get; set; }
        public string? Role { get; set; }
        public List<ToDoGroupDto> ToDoGroups { get; set; } = new List<ToDoGroupDto>();
    }
}
