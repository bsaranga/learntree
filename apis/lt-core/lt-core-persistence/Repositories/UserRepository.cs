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

        public async Task MarkLogged(UserActivityEvent loginMessage)
        {
            var userLog = context.UserActivity?.FirstOrDefault(u => u.KcUserId == loginMessage.UserId);
            
            if (userLog == null && loginMessage.Type == "LOGIN") {
                // first login of the user
                
                var act = new UserActivity() 
                {
                    KcUserId = loginMessage.UserId,
                    LastActiveSessionId = loginMessage.SessionId,
                    LastLoggedIn = DateTime.UtcNow,
                    IsOnline = true
                };

                context.UserActivity?.Add(act);
                await context.SaveChangesAsync();

            } else if (userLog != null && loginMessage.Type == "LOGIN") {

                userLog!.IsOnline = true;
                userLog!.LastActiveSessionId = loginMessage.SessionId;
                userLog!.LastLoggedIn = DateTime.UtcNow;
                
                context.UserActivity?.Update(userLog);
                await context.SaveChangesAsync();
            }

            if (loginMessage.Type == "LOGOUT") {

                userLog = context.UserActivity?.FirstOrDefault(u => u.KcUserId == loginMessage.UserId);
                userLog!.IsOnline = false;
                context.UserActivity?.Update(userLog);
                await context.SaveChangesAsync();
            }
        }
    }
}