using lt_core_application.KeyCloakMessages;
using lt_core_persistence.Repositories;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace lt_core_persistence.Consumers
{
    public class UserLoginConsumer : IConsumer<Login>
    {
        private readonly ILogger<UserLoginConsumer> logger;
        private readonly IUserRepository userRepository;

        public UserLoginConsumer(ILogger<UserLoginConsumer> logger, IUserRepository userRepository)
        {
            this.logger = logger;
            this.userRepository = userRepository;
        }
        public async Task Consume(ConsumeContext<Login> context)
        {
            await userRepository.MarkLogged(context.Message);
        }
    }
}