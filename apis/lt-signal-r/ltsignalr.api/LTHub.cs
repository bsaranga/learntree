using Microsoft.AspNetCore.SignalR;

namespace ltsignalr.api
{
    public class LTHub : Hub
    {
        private readonly ILogger<LTHub> _logger;
        public LTHub(ILogger<LTHub> logger)
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
            Groups.AddToGroupAsync(this.Context.ConnectionId, $"{this.Context?.User?.Identity?.Name}");
            _logger.LogInformation($"Connected to Client with ID: {this.Context?.ConnectionId}");
            return base.OnConnectedAsync();
        }
    }
}