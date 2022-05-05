using ltgraph.domain.DTOs;

namespace ltgraph.domain.Interfaces
{
    public interface ILPathRepository
    {
        Task CreateLearningPath(LearningPath lpath);
    }
}