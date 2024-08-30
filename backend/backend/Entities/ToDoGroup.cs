namespace backend.Entities
{
    public class ToDoGroup
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? Visible { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public List<ToDoItem> ToDoItems { get; set; } = new List<ToDoItem>();
    }
}
