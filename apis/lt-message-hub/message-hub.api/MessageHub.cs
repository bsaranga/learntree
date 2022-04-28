using Microsoft.AspNetCore.SignalR;

namespace message_hub.api
{
    public class MessageHub : Hub
    {
        public async Task SendMessage(string message) 
        {
            await this.Clients.All.SendAsync("AcceptMessage", message);
        }
    }
}