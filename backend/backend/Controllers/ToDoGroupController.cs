using backend.Entities;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/todo-group")]
    [ApiController]
    public class ToDoGroupController : ControllerBase
    {
        private readonly IToDoGroupService _service;

        public ToDoGroupController(IToDoGroupService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _service.GetAllAsync(pageNumber, pageSize);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Policy = "AdminOrUser")]
        public async Task<IActionResult> Create([FromBody] ToDoGroup group)
        {
            if (group == null)
            {
                return BadRequest("ToDoGroup object is null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var groupId = await _service.CreateAsync(group);

            return StatusCode(201, new { Id = groupId });
        }

        [HttpGet("by-login/{login}")]
        public async Task<IActionResult> GetUserGroupsByLogin(string login)
        {
            var result = await _service.GetByLoginAsync(login);

            return Ok(result);
        }

        [HttpGet("by-user-id/{userId}")]
        public async Task<IActionResult> GetUserGroupsByUserId(int userId)
        {
            var result = await _service.GetByUserIdAsync(userId);

            return Ok(result);
        }

        [HttpGet("by-login-only-enabled/{login}")]
        [Authorize(Policy = "AdminOrUser")]
        public async Task<IActionResult> GetUserGroupsByLoginOnlyEnabled(string login)
        {
            var result = await _service.GetByLoginOnlyEnabledAsync(login);

            return Ok(result);
        }

        [HttpGet("to-do-in-group/{groupId}")]
        public async Task<IActionResult> GetToDoInGroupByGroupId(int groupId)
        {
            var result = await _service.GetToDoInGroupByGroupId(groupId);

            return Ok(result);
        }

        [HttpPatch("change-visibility/{groupId}")]
        public async Task<IActionResult> UpdateGroupVisibility(int groupId)
        {
            var result = await _service.ChangeGroupVisibilityAsync(groupId);

            return Ok(result);
        }

        [HttpPatch("change-group/{groupId}")]
        public async Task<IActionResult> UpdateData(int groupId, ToDoGroup toDoGroup)
        {
            var result = await _service.UpdateAsync(groupId, toDoGroup);

            return Ok(result);
        }
    }
}
