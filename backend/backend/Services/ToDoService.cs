using backend.Entities;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface IToDoService
    {
        Task<int> CreateAsync(ToDoItem item);
        Task<SimpleResponse<ToDoItem>> GetByIdAsync(int id);
        Task<PageResult<ToDoItem>> GetAllAsync(int pageNumber, int pageSize);
        Task<bool> UpdateAsync(ToDoItem item);
        Task<bool> DeleteAsync(int id);
        Task<bool> ToggleIsCompleteAsync(int id);
    }

    public class ToDoService : IToDoService
    {
        private readonly ApplicationDbContext _context;

        public ToDoService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(ToDoItem item)
        {
            _context.ToDoItems.Add(item);
            await _context.SaveChangesAsync();
            return item.Id;
        }

        public async Task<SimpleResponse<ToDoItem>> GetByIdAsync(int id)
        {
            var item = await _context.ToDoItems.FindAsync(id);
            return new SimpleResponse<ToDoItem>
            {
                Item = item
            };
        }

        public async Task<PageResult<ToDoItem>> GetAllAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _context.ToDoItems.CountAsync();
            var items = await _context.ToDoItems
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PageResult<ToDoItem>
            {
                Items = items,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount
            };
        }

        public async Task<bool> UpdateAsync(ToDoItem item)
        {
            var existingItem = await _context.ToDoItems.FindAsync(item.Id);
            if (existingItem == null)
            {
                return false;
            }

            existingItem.Title = item.Title;
            existingItem.IsComplete = item.IsComplete;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await _context.ToDoItems.FindAsync(id);
            if (item == null)
            {
                return false;
            }

            _context.ToDoItems.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ToggleIsCompleteAsync(int id)
        {
            var item = await _context.ToDoItems.FindAsync(id);
            if (item == null)
            {
                return false;
            }

            item.IsComplete = !item.IsComplete;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
