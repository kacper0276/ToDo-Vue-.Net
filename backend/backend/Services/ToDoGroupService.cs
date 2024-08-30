using backend.Entities;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface IToDoGroupService
    {
        Task<int> CreateAsync(ToDoGroup group);
        Task<ToDoGroup?> GetByIdAsync(int id);
        Task<PageResult<ToDoGroup>> GetAllAsync(int pageNumber, int pageSize);
        Task<bool> UpdateAsync(ToDoGroup group);
        Task<bool> DeleteAsync(int id);
    }

    public class ToDoGroupService : IToDoGroupService
    {
        private readonly ApplicationDbContext _context;

        public ToDoGroupService(ApplicationDbContext context) { _context = context; }

        public async Task<int> CreateAsync(ToDoGroup group)
        {
            _context.ToDoGroups.Add(group);
            await _context.SaveChangesAsync();
            return group.Id;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await _context.ToDoGroups.FindAsync(id);
            if (item == null)
            {
                return false;
            }

            _context.ToDoGroups.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<PageResult<ToDoGroup>> GetAllAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _context.ToDoGroups.CountAsync();
            var groups = await _context.ToDoGroups
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PageResult<ToDoGroup>
            {
                TotalCount = totalCount,
                Items = groups,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        public async Task<ToDoGroup?> GetByIdAsync(int id)
        {
            return await _context.ToDoGroups.FindAsync(id);
        }
        public async Task<bool> UpdateAsync(ToDoGroup group)
        {
            var existingGroup = await _context.ToDoGroups.FindAsync(group.Id);
            if (existingGroup == null)
            {
                return false;
            }

            existingGroup.Name = group.Name;
            existingGroup.Description = group.Description;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
