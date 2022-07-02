namespace lt_core_persistence.Models
{
    public class LearningPathMetaData : BaseEntity
    {
        public int LPId { get; set; }
        public string? LPCode { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? UserId { get; set; }
        public int UpVotes { get; set; } = 0;
        public int DownVotes { get; set; } = 0;
        public int CommentCount { get; set; } = 0;
    }
}