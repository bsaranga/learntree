using Microsoft.AspNetCore.SignalR;

namespace message_hub.api
{
    public class MessageHub : Hub
    {
        private readonly ILogger<MessageHub> _logger;
        public MessageHub(ILogger<MessageHub> logger)
        {
            _logger = logger;
        }
        public async Task SendMessage(string message) 
        {
            var intercepted = $"{this.Context?.User?.Identity?.Name} sent {message}";
            await this.Clients.Caller.SendAsync("AcceptMessage", intercepted);
        }

        public override Task OnConnectedAsync()
        {
            _logger.LogInformation($"Connected to Client with ID: {this.Context.ConnectionId}");
            return base.OnConnectedAsync();
        }
    }
}