using lt_core_persistence.Models.JoinEntities;

namespace lt_core_persistence.Models
{
    public class UserActivity : BaseEntity
    {
        public int Id { get; set; }
        public string? KcUserId { get; set; }
        public string? LastActiveSessionId { get; set; }
        public DateTime LastLoggedIn { get; set; }
        public bool IsOnline { get; set; }

        // Navigation Property
        public ICollection<Topic>? Topics { get; set; } 
        public List<UserTopic>? UserTopics { get; set; }
    }
}