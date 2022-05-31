using lt_core_application.KeyCloakMessages;
using lt_core_persistence.Models;

namespace lt_core_persistence.Repositories
{
    public interface IUserRepository
    {
        Task MarkLogged(Login loginMessage);
    }
}