using backend.Entities;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/todo")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IToDoService _toDoService;

        public ToDoController(IToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _toDoService.GetAllAsync(pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _toDoService.GetByIdAsync(id);
            if (item == null)
            {
                return NotFound(new { message = "ToDo item not found" });
            }
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ToDoItem item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newItemId = await _toDoService.CreateAsync(item);
            return CreatedAtAction(nameof(GetById), new { id = newItemId }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ToDoItem item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            item.Id = id;
            var updated = await _toDoService.UpdateAsync(item);

            if (!updated)
            {
                return NotFound(new { message = "ToDo item not found" });
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _toDoService.DeleteAsync(id);
            if (!deleted)
            {
                return NotFound(new { message = "ToDo item not found" });
            }
            return NoContent();
        }

        [HttpPut("{id}/toggle")]
        public async Task<IActionResult> ToggleIsComplete(int id)
        {
            var result = await _toDoService.ToggleIsCompleteAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
