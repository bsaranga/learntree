namespace lt_core_application.KeyCloakModels
{
    public class User
    {
        public string? Id { get; set; }
        public Int64 createdTimestamp { get; set; }
        public string? Username { get; set; }
        public bool Enabled { get; set; }
        public bool EmailVerified { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
    }
}