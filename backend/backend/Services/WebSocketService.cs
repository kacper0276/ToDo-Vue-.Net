using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace backend.Services
{
    public class WebSocketService
    {
        private readonly ConcurrentDictionary<string, WebSocket> _adminSockets = new();
        private readonly ConcurrentQueue<WebSocket> _userQueue = new();
        private readonly ConcurrentDictionary<WebSocket, string> _userSessions = new();
        private readonly SemaphoreSlim _queueSemaphore = new(1, 1);

        public async Task HandleWebSocketConnection(HttpContext context)
        {
            if (context.WebSockets.IsWebSocketRequest)
            {
                var webSocket = await context.WebSockets.AcceptWebSocketAsync();
                var query = context.Request.Query;
                var userRole = query["role"].ToString();

                Console.WriteLine("ROLE: " + userRole );

                if (userRole == "ADMIN")
                {
                    await HandleAdminConnection(webSocket);
                }
                else
                {
                    await HandleUserConnection(webSocket);
                }
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }

        private async Task HandleAdminConnection(WebSocket adminSocket)
        {
            _adminSockets[adminSocket.GetHashCode().ToString()] = adminSocket;
            await NotifyAdmin(adminSocket, "You are connected as an admin.");

            while (adminSocket.State == WebSocketState.Open)
            {
                var (message, userSocket) = await ReceiveMessage(adminSocket);
                if (userSocket != null)
                {
                    await SendMessage(userSocket, "Connected to an admin.");
                }
                else
                {
                    await SendMessage(adminSocket, "No user is waiting.");
                }
            }

            _adminSockets.TryRemove(adminSocket.GetHashCode().ToString(), out _);
        }

        private async Task HandleUserConnection(WebSocket userSocket)
        {
            await _queueSemaphore.WaitAsync();

            _userQueue.Enqueue(userSocket);
            var adminSocket = await GetAvailableAdmin();

            if (adminSocket != null)
            {
                _userQueue.TryDequeue(out _);
                await SendMessage(userSocket, "Connected to an admin.");
                await SendMessage(adminSocket, "A user is connected.");
                await NotifyUser(userSocket, "You are connected to an admin.");
            }
            else
            {
                await NotifyUser(userSocket, "Waiting for an available admin.");
            }

            _queueSemaphore.Release();

            while (userSocket.State == WebSocketState.Open)
            {
                var (message, _) = await ReceiveMessage(userSocket);
                if (adminSocket != null)
                {
                    await SendMessage(adminSocket, message);
                }
            }
        }

        private async Task<(string message, WebSocket? userSocket)> ReceiveMessage(WebSocket socket)
        {
            var buffer = new byte[1024 * 4];
            var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);

            if (result.CloseStatus.HasValue)
            {
                await socket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
                return (message, null);
            }

            return (message, null);
        }

        private async Task<WebSocket?> GetAvailableAdmin()
        {
            return _adminSockets.Values.FirstOrDefault();
        }

        private async Task SendMessage(WebSocket socket, string message)
        {
            var buffer = Encoding.UTF8.GetBytes(message);
            await socket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
        }

        private async Task NotifyAdmin(WebSocket adminSocket, string message)
        {
            await SendMessage(adminSocket, message);
        }

        private async Task NotifyUser(WebSocket userSocket, string message)
        {
            await SendMessage(userSocket, message);
        }
    }
}
