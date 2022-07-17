using ltgraph.domain.DTOs;
using ltgraph.domain.Models.Graph;
using ltgraph.domain.Models.Graph.EventTypes;
using Neo4j.Driver;

namespace ltgraph.domain.Interfaces
{
    public interface ILPathRepository
    {
        Task CreateLearningPath(DTOs.NodeDTO lpath);
        IResultSummary AddRootNode(string name);
        Task SaveLPContext(LPathContext lPathContext);
        Task WriteGraphEvents(List<GraphEvent> GraphEvents);
    }
}