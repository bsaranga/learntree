namespace ltgraph.domain.Models.Graph.EventTypes
{
    public abstract class GraphEvent {}
    public class GraphEvent<T> : GraphEvent where T : class
    {
        public T? Delta { get; set; }
        public string? Type { get; set; }
    }
}