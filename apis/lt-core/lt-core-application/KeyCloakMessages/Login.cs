using System.Text.Json.Serialization;

namespace lt_core_application.KeyCloakMessages
{
    public class Login
    {
        public Int64 Time { get; set; }
        public string? Type { get; set; }
        public string? RealmId { get; set; }
        public string? ClientId { get; set; }
        public string? UserId { get; set; }
        public string? SessionId { get; set; }
        
        [JsonPropertyName("identity_provider")]
        public string? IdentityProvider { get; set; }
    }
}