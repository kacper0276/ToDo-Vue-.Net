using System.Net.WebSockets;
using System.Text;

namespace backend
{
    public class WebSocketServer
    {
        public async Task HandleWebSocketConnection(HttpContext context)
        {
            if (context.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await context.WebSockets.AcceptWebSocketAsync();

                Console.WriteLine($"Nowe połączenie WebSocket: {context.Connection.RemoteIpAddress}");

                await EchoMessages(webSocket);
            }
            else
            {
                context.Response.StatusCode = 400;
            }
        }

        private async Task EchoMessages(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!result.CloseStatus.HasValue)
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                Console.WriteLine($"Odebrano: {message}");

                await webSocket.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);

                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            }

            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);

            Console.WriteLine("Połączenie WebSocket zamknięte.");
        }
    }
}
