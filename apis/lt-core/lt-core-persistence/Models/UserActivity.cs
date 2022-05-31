namespace lt_core_persistence.Models
{
    public class UserActivity : BaseEntity
    {
        public int Id { get; set; }
        public string? KcUserId { get; set; }
        public DateTime LastLoggedIn { get; set; }
        public bool IsOnline { get; set; }
    }
}