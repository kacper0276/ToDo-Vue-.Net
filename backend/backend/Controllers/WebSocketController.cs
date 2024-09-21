using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/ws")]
    public class WebSocketController : ControllerBase
    {
        private readonly WebSocketService _webSocketService;

        public WebSocketController(WebSocketService webSocketService)
        {
            _webSocketService = webSocketService;
        }

        [HttpGet("connect")]
        public async Task<IActionResult> Connect()
        {
            await _webSocketService.HandleWebSocketConnection(HttpContext);
            return Ok();
        }
    }
}
