using learntree_graph.domain.DTOs;

namespace learntree_graph.domain.Interfaces
{
    public interface ILPathRepository
    {
        Task CreateLearningPath(LearningPath lpath);
    }
}