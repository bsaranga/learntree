using lt_core_application.Interfaces;
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
        private readonly IKeycloakAdmin kcAdmin;

        public UserRegisteredConsumer(ILogger<UserRegisteredConsumer> logger, IUserRepository userRepository, IKeycloakAdmin kcAdmin)
        {
            this.logger = logger;
            this.userRepository = userRepository;
            this.kcAdmin = kcAdmin;
        }
        public async Task Consume(ConsumeContext<UserRegistered> context)
        {
            User? regUser = null;
            if (context.Message.Details?.IdentityProvider == "google") {
                var userFromKc = await kcAdmin.GetUserById(context.Message.UserId!);
                regUser = new User() 
                {
                    KcUserId = context.Message.UserId,
                    Username = userFromKc?.Username,
                    Email = userFromKc?.Email,
                    Firstname = userFromKc?.FirstName,
                    Lastname = userFromKc?.LastName
                };

            } else {
                regUser = new User() 
                {
                    KcUserId = context.Message.UserId,
                    Username = context.Message.Details?.Username,
                    Email = context.Message.Details?.Email,
                    Firstname = context.Message.Details?.Firstname,
                    Lastname = context.Message.Details?.Lastname
                };
            }

            if (regUser != null) await userRepository.RegisterUser(regUser);
            this.logger.LogInformation("RECEIVED USER REGISTERED EVENT");
        }
    }
}