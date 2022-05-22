namespace lt_core_api.Utilities.Interfaces
{
    public interface IKeycloakAdminInit
    {
        Task Authenticate();
        Task ScheduledUpdate();
    }
}