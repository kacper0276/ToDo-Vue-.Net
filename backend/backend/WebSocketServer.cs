using System.Net.WebSockets;
using System.Text;
using System.Collections.Concurrent;

namespace backend
{
    public class WebSocketServer
    {
        private static readonly ConcurrentQueue<HttpContext> connectionQueue = new ConcurrentQueue<HttpContext>();
        private static WebSocket? activeWebSocket = null;
        private static readonly object lockObject = new object();

        public async Task HandleWebSocketConnection(HttpContext context)
        {
            if (context.WebSockets.IsWebSocketRequest)
            {
                connectionQueue.Enqueue(context);
                TryProcessNextConnection();
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }

        private void TryProcessNextConnection()
        {
            lock (lockObject)
            {
                if (activeWebSocket != null && activeWebSocket.State == WebSocketState.Open)
                {
                    Console.WriteLine("Active WebSocket session ongoing. New connection in queue.");
                    return;
                }

                if (connectionQueue.TryDequeue(out HttpContext? nextContext))
                {
                    ProcessConnection(nextContext).ConfigureAwait(false);
                }
            }
        }

        private async Task ProcessConnection(HttpContext context)
        {
            try
            {
                using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
                lock (lockObject)
                {
                    activeWebSocket = webSocket;
                }

                Console.WriteLine($"New WebSocket connection: {context.Connection.RemoteIpAddress}");
                await EchoMessages(webSocket);

                lock (lockObject)
                {
                    activeWebSocket = null;
                }

                Console.WriteLine("WebSocket connection processing completed.");
                TryProcessNextConnection();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing WebSocket connection: {ex.Message}");
            }
        }


        private static async Task EchoMessages(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            var receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!receiveResult.CloseStatus.HasValue)
            {
                await webSocket.SendAsync(
                    new ArraySegment<byte>(buffer, 0, receiveResult.Count),
                    receiveResult.MessageType,
                    receiveResult.EndOfMessage,
                    CancellationToken.None);

                receiveResult = await webSocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer), CancellationToken.None);
            }

            await webSocket.CloseAsync(
                receiveResult.CloseStatus.Value,
                receiveResult.CloseStatusDescription,
                CancellationToken.None);
        }
    }
}
