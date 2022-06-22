using lt_core_application.DTOs;
using lt_core_application.KeyCloakMessages;
using lt_core_persistence.Models;

namespace lt_core_persistence.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task MarkLogged(UserActivityEvent loginMessage);
        Task AssociateUserTopics(IEnumerable<UserTopicDTO> userTopics);
    }
}