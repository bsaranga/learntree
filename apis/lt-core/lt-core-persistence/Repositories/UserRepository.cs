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

        public async Task RegisterUser(User User)
        {
            context.User?.Add(User);
            await context.SaveChangesAsync();
        }
    }
}