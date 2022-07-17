namespace ltgraph.domain.Models.Graph
{
    public class Edge
    {
        public string? Id { get; set; }
        public string? Source { get; set; }
        public string? Target { get; set; }
        public EdgeStyleAttr? Style { get; set; }
        public EdgeMarker? MarkerEnd { get; set; }
        public string? Label { get; set; }
    }
}