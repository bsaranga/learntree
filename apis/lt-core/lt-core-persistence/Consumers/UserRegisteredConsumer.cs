using lt_core_application.KeyCloakMessages;
using lt_core_persistence.Models;
using lt_core_persistence.Repositories;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace lt_core_persistence.Consumers
{
    public class UserRegisteredConsumer : IConsumer<UserRegistered>
    {
        private readonly ILogger<UserRegisteredConsumer> logger;
        private readonly IUserRepository userRepository;

        public UserRegisteredConsumer(ILogger<UserRegisteredConsumer> logger, IUserRepository userRepository)
        {
            this.logger = logger;
            this.userRepository = userRepository;
        }
        public async Task Consume(ConsumeContext<UserRegistered> context)
        {
            var regUser = new User() 
            {
                KcUserId = context.Message.UserId,
                Username = context.Message.Details?.Username,
                Email = context.Message.Details?.Email,
                Firstname = context.Message.Details?.Firstname,
                Lastname = context.Message.Details?.Lastname
            };

            await userRepository.RegisterUser(regUser);
            this.logger.LogInformation("RECEIVED USER REGISTERED EVENT");
        }
    }
}