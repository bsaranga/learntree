using System.Text.Json.Serialization;
using ltgraph.domain.Models.Enums;

namespace ltgraph.domain.DTOs
{
    public class NodeDTO
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public NodeType? NodeType { get; set; }
        public List<NodeDTO>? Children { get; set; }
    }
}