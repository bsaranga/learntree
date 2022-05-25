using lt_core_persistence.Models;

namespace lt_core_persistence.Repositories
{
    public interface IUserRepository
    {
        Task RegisterUser(User User);
        Task MarkLogged(DateTime Timestamp);
    }
}