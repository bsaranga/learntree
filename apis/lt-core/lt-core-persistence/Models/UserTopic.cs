namespace lt_core_persistence.Models
{
    public class UserTopic
    {
        public int UserTopicId { get; set; }
        public string? UserId { get; set; }
        public UserActivity? UserActivity { get; set; }
        public int TopicId { get; set; }
        public Topic? Topic { get; set; }
    }
}