using System.Text.Json.Serialization;

namespace ltgraph.domain.Models.Graph.Base
{
    public class Position
    {
        [JsonPropertyName("x")]
        public decimal XPosition { get; set; }
        
        [JsonPropertyName("y")]
        public decimal YPosition { get; set; }
    }
}