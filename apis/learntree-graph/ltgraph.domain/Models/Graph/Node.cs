using System.Text.Json.Serialization;
using ltgraph.domain.Models.Enums;
using ltgraph.domain.Models.Graph.Base;

namespace ltgraph.domain.Models.Graph
{
    public class Node : BaseNode
    {
        public string? Id { get; set; }
        
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public NodeType Type { get; set; }
        public Position? Position { get; set; }
        public NodeData? Data { get; set; }

    }
}