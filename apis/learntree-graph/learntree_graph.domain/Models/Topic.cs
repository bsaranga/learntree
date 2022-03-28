using learntree_graph.domain.Models.BaseModels;

namespace learntree_graph.domain.Models
{
    public class Topic : BaseEntity
    {
        public int TopicId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? ResourceUriPage { get; set; }

        public List<Topic> Previous { get; set; } = new List<Topic>();
        public List<Topic> Next { get; set; } = new List<Topic>();
    }
}
