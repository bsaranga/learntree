using lt_core_application.KeyCloakModels;

namespace lt_core_application.Interfaces
{
    public interface IKeycloakAdmin
    {
        Task<List<string>> GetAllUserNames();
        Task<User?> GetUserById(string guid);
    }
}