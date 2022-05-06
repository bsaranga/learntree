using System.Text.Json.Serialization;
using ltgraph.domain.Models.Enums;

namespace ltgraph.domain.DTOs
{
    public class Node
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public NodeType? NodeType { get; set; }
        public List<Node>? Children { get; set; }
    }
}