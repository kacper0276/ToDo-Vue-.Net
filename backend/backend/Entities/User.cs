﻿namespace backend.Entities
{
    public class User
    {
        public int Id { get; set; }
        public required string Login { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
        public string? Role { get; set; }
        public List<ToDoGroup> ToDoGroups { get; set; } = new List<ToDoGroup>();
    }
}
