using backend.Entities;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface IToDoGroupService
    {
        Task<int> CreateAsync(ToDoGroup group);
        Task<SimpleResponse<ToDoGroup>> GetByIdAsync(int id);
        Task<ListResponse<ToDoGroup>> GetByLoginAsync(string login);
        Task<ListResponse<ToDoGroup>> GetByUserIdAsync(int userId);
        Task<ListResponse<ToDoGroup>> GetByLoginOnlyEnabledAsync(string login);
        Task<ListResponse<ToDoItem>> GetToDoInGroupByGroupId(int id);
        Task<PageResult<ToDoGroup>> GetAllAsync(int pageNumber, int pageSize);
        Task<bool> UpdateAsync(int groupId, ToDoGroup group);
        Task<bool> DeleteAsync(int id);
        Task<bool> ChangeGroupVisibilityAsync(int groupId);
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

        public async Task<SimpleResponse<ToDoGroup>> GetByIdAsync(int id)
        {
            var group = await _context.ToDoGroups
                .Include(g => g.ToDoItems)
                .FirstOrDefaultAsync(g => g.Id == id);

            return new SimpleResponse<ToDoGroup>
            {
                Item = group
            };
        }

        public async Task<ListResponse<ToDoGroup>> GetByLoginAsync(string login)
        {
            var results = await _context.ToDoGroups
                .Include(tdg => tdg.ToDoItems)
                .Where(tdg => tdg.User.Login == login)
                .ToListAsync();

            return new ListResponse<ToDoGroup>
            {
                Items = results
            };
        }

        public async Task<ListResponse<ToDoGroup>> GetByUserIdAsync(int userId)
        {
            var results = await _context.ToDoGroups
                .Where(tdg => tdg.User.Id == userId)
                .ToListAsync();

            return new ListResponse<ToDoGroup>
            {
                Items = results
            };
        }

        public async Task<ListResponse<ToDoGroup>> GetByLoginOnlyEnabledAsync(string login)
        {
            var results = await _context.ToDoGroups
                .Include(tdg => tdg.ToDoItems)
                .Where(tdg => tdg.User.Login == login && tdg.Visible.HasValue && tdg.Visible.Value)
                .ToListAsync();

            return new ListResponse<ToDoGroup>
            {
                Items = results
            };
        }

        public async Task<ListResponse<ToDoItem>> GetToDoInGroupByGroupId(int id)
        {
            var group = await _context.ToDoGroups
                .Include(tdg => tdg.ToDoItems)
                .FirstOrDefaultAsync(tdg => tdg.Id == id);

            if (group == null)
            {
                return new ListResponse<ToDoItem>
                {
                    Items = new List<ToDoItem>()
                };
            }

            return new ListResponse<ToDoItem>
            {
                Items = group.ToDoItems
            };
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
        
        public async Task<bool> UpdateAsync(int groupId, ToDoGroup group)
        {
            var existingGroup = await _context.ToDoGroups.FindAsync(groupId);
            if (existingGroup == null)
            {
                return false;
            }

            existingGroup.Name = group.Name;
            existingGroup.Description = group.Description;

            await _context.SaveChangesAsync();
            return true;
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

        public async Task<bool> ChangeGroupVisibilityAsync(int groupId)
        {
            var item = await _context.ToDoGroups.FindAsync(groupId);
            if (item == null )
            {
                return false;
            }

            item.Visible = !item.Visible;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
