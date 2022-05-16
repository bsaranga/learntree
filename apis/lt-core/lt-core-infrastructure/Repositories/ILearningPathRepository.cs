using lt_core_application.DTOs;

namespace lt_core_infrastructure.Repositories
{
    public interface ILearningPathRepository
    {
        Task InsertLearningPath(LPDto learningPath);
    }
}