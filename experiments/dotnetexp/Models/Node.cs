using System.Text.Json.Serialization;

namespace Models
{
    public class Node
    {
        [JsonPropertyName("id")]
        public string? Id { get; set; }
        [JsonPropertyName("name")]
        public string? Name { get; set; }
        [JsonPropertyName("nodeType")]
        public string? NodeType { get; set; }
        [JsonPropertyName("children")]
        public List<Node>? Children { get; set; }
    }
}