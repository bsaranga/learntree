namespace lt_core_persistence.Models
{
    public class Topic : BaseEntity
    {
        public int TopicId { get; set; }
        public string? TopicName { get; set; }

        // Navigation Property
        public List<UserTopic>? UserTopic { get; set; }
    }
}