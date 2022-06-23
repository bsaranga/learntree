using lt_contracts;
using lt_core_application.DTOs;
using lt_core_application.Interfaces;
using lt_core_application.KeyCloakMessages;
using lt_core_persistence.Interfaces.Repositories;
using lt_core_persistence.Models;
using MassTransit;
using Microsoft.EntityFrameworkCore;

namespace lt_core_persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly LTCoreDbContext context;
        private readonly IClaimInfo claimInfo;
        private readonly IBus bus;

        public UserRepository(LTCoreDbContext context, IBus bus, IClaimInfo claimInfo)
        {
            this.claimInfo = claimInfo;
            this.context = context;
            this.bus = bus;
        }

        public async Task MarkLogged(UserActivityEvent loginMessage)
        {
            var userLog = context.UserActivity?.FirstOrDefault(u => u.KcUserId == loginMessage.UserId);
            //temp
            await bus.Publish<FreshLogin>(new { UserIdentifier = loginMessage.UserId }, p => p.Delay = TimeSpan.FromSeconds(5));
            
            if (userLog == null && loginMessage.Type == "LOGIN") {
                
                // first login of the user
                //await bus.Publish<FreshLogin>(new { UserIdentifier = loginMessage.UserId });

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

        public async Task AssociateUserTopic(List<int> Topics) {
            
            var userId = claimInfo.GetUserId();
            var userTopics = new List<UserTopic>();

            Topics.ForEach(t => {
                userTopics.Add(new UserTopic { UserId = userId, TopicId = t });
            });

            context.UserTopic?.AddRange(userTopics);
            await context.SaveChangesAsync();
        }

        public async Task<List<Topic?>> GetTopics()
        {
            var userId = claimInfo.GetUserId();
            var topics = context?.UserTopic?.Include(t => t.Topic).Where(ut => ut.UserId == userId).Select(t => t.Topic);
            var output = await topics?.ToListAsync()!;

            return output;
        }
    }
}