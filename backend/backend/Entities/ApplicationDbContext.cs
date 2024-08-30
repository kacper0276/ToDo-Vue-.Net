using Microsoft.EntityFrameworkCore;

namespace backend.Entities
{
    public class ApplicationDbContext : DbContext
    {
        private string _connectionString = "Server=localhost,1433;Database=todo;User Id=sa;Password=Haslo123!;TrustServerCertificate=True";

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ToDoItem> ToDoItems { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ToDoGroup> ToDoGroups { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
