using lt_core_application.KeyCloakMessages;
using lt_core_persistence.Models;

namespace lt_core_persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly LTCoreDbContext context;
        public UserRepository(LTCoreDbContext context)
        {
            this.context = context;
        }

        public async Task MarkLogged(Login loginMessage)
        {
            var act = new UserActivity() 
            {
                KcUserId = loginMessage.ClientId,
                LastLoggedIn = DateTime.UtcNow,
                IsOnline = true
            };

            context.UserActivity?.Add(act);
            await context.SaveChangesAsync();
        }
    }
}