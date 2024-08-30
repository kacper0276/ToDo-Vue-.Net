﻿namespace backend.Entities
{
    public class ToDoItem
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public bool IsComplete { get; set; }
        public string? Description { get; set; }
        public int ToDoGroupId { get; set; }
        public ToDoGroup? ToDoGroup { get; set; }
    }
}
