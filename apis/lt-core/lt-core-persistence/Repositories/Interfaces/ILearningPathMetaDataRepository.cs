using lt_core_application.DTOs;
using lt_core_application.ResponseModels;

namespace lt_core_persistence.Interfaces.Repositories
{
    public interface ILearningPathMetaDataRepository
    {
        Task<InsertionResponse<LPMetadataDTO>> InsertLPMetaData(LPMetadataDTO learningPath);
    }
}