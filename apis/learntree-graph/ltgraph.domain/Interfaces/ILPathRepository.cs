using ltgraph.domain.DTOs;
using ltgraph.domain.Models.Graph;
using ltgraph.domain.Models.Graph.EventTypes;
using Neo4j.Driver;

namespace ltgraph.domain.Interfaces
{
    public interface ILPathRepository
    {
        Task WriteGraphEvents(List<GraphEvent> GraphEvents);
    }
}