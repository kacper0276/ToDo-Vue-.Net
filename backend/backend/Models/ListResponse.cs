namespace backend.Models
{
    public class ListResponse<T>
    {
        public List<T> Items { get; set; } = new List<T>();
    }
}
