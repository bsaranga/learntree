namespace lt_core_persistence.Models
{
    public class User : BaseEntity
    {
        public int Id { get; set; }
        public string? KcUserId { get; set; }
        public string? Username { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? Email { get; set; }
    }
}