using System.Text.Json.Serialization;

namespace lt_core_application.KeyCloakMessages
{
    public class UserRegistered
    {
        public Int64 Time { get; set; }
        public string? UserId { get; set; }
        public UserRegDetails? Details { get; set; }
    }

    public class UserRegDetails
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        
        [JsonPropertyName("first_name")]
        public string? Firstname { get; set; }
        
        [JsonPropertyName("last_name")]
        public string? Lastname { get; set; }

        [JsonPropertyName("identity_provider")]
        public string? IdentityProvider { get; set; }
        
    }
}