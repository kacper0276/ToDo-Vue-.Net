namespace backend.Models
{
    public class ToDoGroupDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? Visible { get; set; }
        public List<ToDoItemDto> ToDoItems { get; set; } = new List<ToDoItemDto>();
    }
}
