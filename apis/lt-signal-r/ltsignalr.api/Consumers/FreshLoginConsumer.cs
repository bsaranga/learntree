using lt_contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace ltsignalr.api.Consumers
{
    public class FreshLoginConsumer : IConsumer<FreshLogin>
    {
        private readonly IHubContext<LTHub> hubContext;

        public FreshLoginConsumer(IHubContext<LTHub> hubContext)
        {
            this.hubContext = hubContext;
        }
        public async Task Consume(ConsumeContext<FreshLogin> context)
        {
            var userIdentifier = context.Message.UserIdentifier;
            await hubContext.Clients.Group(userIdentifier).SendAsync("FirstLogin", true);
        }
    }
}