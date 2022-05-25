namespace lt_core_application.KeyCloakMessages
{
    public class UserRegistered
    {
        public Int64 Time { get; set; }
        public string? UserId { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? RegisterMethod { get; set; }
    }
}