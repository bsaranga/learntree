namespace lt_core_persistence.Models.JoinEntities
{
    public class UserTopic : BaseEntity
    {
        public int UserTopicId { get; set; }
        public string? FkUserId { get; set; }
        public UserActivity? UserActivity { get; set; }

        public int FkTopicId { get; set; }
        public Topic? Topic { get; set; }
    }
}