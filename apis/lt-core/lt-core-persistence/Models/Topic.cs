using lt_core_persistence.Models.JoinEntities;

namespace lt_core_persistence.Models
{
    public class Topic : BaseEntity
    {
        public int TopicId { get; set; }
        public string? TopicName { get; set; }

        // Navigation Property
        public ICollection<UserActivity>? UserActivities { get; set; }
        public List<UserTopic>? UserTopics { get; set; }
    }
}