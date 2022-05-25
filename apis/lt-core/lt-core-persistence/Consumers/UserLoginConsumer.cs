using lt_core_application.KeyCloakMessages;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace lt_core_persistence.Consumers
{
    public class UserLoginConsumer : IConsumer<Login>
    {
        private readonly ILogger<UserLoginConsumer> logger;
        public UserLoginConsumer(ILogger<UserLoginConsumer> logger)
        {
            this.logger = logger;

        }
        public Task Consume(ConsumeContext<Login> context)
        {
            this.logger.LogInformation("................RECEIVED USER LOGIN EVENT.............");
            return Task.CompletedTask;
        }
    }
}