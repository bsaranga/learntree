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
            await this.Clients.All.SendAsync("AcceptMessage", message);
        }

        public override Task OnConnectedAsync()
        {
            _logger.LogInformation($"Connected to Client with ID: {this.Context.ConnectionId}");
            return base.OnConnectedAsync();
        }
    }
}