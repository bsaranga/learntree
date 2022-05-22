namespace lt_core_api.Utilities.Interfaces
{
    public interface IKeycloakAdmin
    {
        Task<List<string>> GetAllUserNames();
    }
}