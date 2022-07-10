namespace ltgraph.domain.Models.Graph
{
    public class LPathContext
    {
        public IEnumerable<Node>? Nodes { get; set; }
        public IEnumerable<Edge>? Edges { get; set; }
        public Viewport? Viewport { get; set; }
        public Metadata? Metadata { get; set; }
    }
}