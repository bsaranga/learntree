namespace ltgraph.domain.Models.Graph.EventTypes
{
    public class GraphEvent<T> where T : class
    {
        public T? Delta { get; set; }
        public string? Type { get; set; }
    }
}