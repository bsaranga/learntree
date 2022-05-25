using lt_core_application.KeyCloakMessages;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace lt_core_persistence.Consumers
{
    public class UserRegisteredConsumer : IConsumer<UserRegistered>
    {
        private readonly ILogger<UserRegisteredConsumer> logger;
        
        public UserRegisteredConsumer(ILogger<UserRegisteredConsumer> logger)
        {
            this.logger = logger;

        }
        public Task Consume(ConsumeContext<UserRegistered> context)
        {
            this.logger.LogInformation("RECEIVED USER REGISTERED EVENT");

            return Task.CompletedTask;
        }
    }
}