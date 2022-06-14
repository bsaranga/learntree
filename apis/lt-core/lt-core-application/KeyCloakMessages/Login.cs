namespace lt_core_application.KeyCloakMessages
{
    public class UserActivityEvent
    {
        public string? UserId { get; set; }
        public string? SessionId { get; set; }
        public string? Type { get; set; }
    }
}