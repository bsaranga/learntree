using ltgraph.domain.DTOs;
using ltgraph.domain.Models.Graph;
using Neo4j.Driver;

namespace ltgraph.domain.Interfaces
{
    public interface ILPathRepository
    {
        Task CreateLearningPath(DTOs.Node lpath);
        IResultSummary AddRootNode(string name);
        Task SaveLPContext(LPathContext lPathContext);
    }
}