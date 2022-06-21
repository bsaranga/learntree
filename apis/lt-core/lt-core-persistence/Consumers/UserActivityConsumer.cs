using lt_core_application.KeyCloakMessages;
using lt_core_persistence.Interfaces.Repositories;
using lt_core_persistence.Repositories;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace lt_core_persistence.Consumers
{
    public class UserActivityConsumer : IConsumer<UserActivityEvent>
    {
        private readonly ILogger<UserActivityConsumer> logger;
        private readonly IUserRepository userRepository;

        public UserActivityConsumer(ILogger<UserActivityConsumer> logger, IUserRepository userRepository)
        {
            this.logger = logger;
            this.userRepository = userRepository;
        }
        public async Task Consume(ConsumeContext<UserActivityEvent> context)
        {
            await userRepository.MarkLogged(context.Message);
        }
    }
}