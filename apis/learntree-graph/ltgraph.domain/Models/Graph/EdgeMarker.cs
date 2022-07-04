using System.Text.Json.Serialization;
using ltgraph.domain.Models.Enums;

namespace ltgraph.domain.Models.Graph
{
    public class EdgeMarker
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public EdgeMarkerType Type { get; set; }
    }
}