using lt_core_application.DTOs;

namespace lt_core_infrastructure.Repositories
{
    public interface ILearningPathMetaDataRepository
    {
        Task InsertLPMetaData(LPMetadataDTO learningPath);
    }
}