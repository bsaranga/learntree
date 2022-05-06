using ltgraph.domain.DTOs;
using Neo4j.Driver;

namespace ltgraph.domain.Interfaces
{
    public interface ILPathRepository
    {
        Task CreateLearningPath(Node lpath);
        IResultSummary AddRootNode(string name);
    }
}