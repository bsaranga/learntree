using System.Text.Json.Serialization;
using learntree_graph.domain.Models.Enums;

namespace learntree_graph.domain.DTOs
{
    public class LearningPath
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public NodeType? NodeType { get; set; }
        public List<LearningPath>? Children { get; set; }
    }
}