using lt_core_application.DTOs;
using lt_core_application.ResponseModels;
using lt_core_persistence.Interfaces.Repositories;
using lt_core_persistence.Models;
using Microsoft.EntityFrameworkCore;

namespace lt_core_persistence.Repositories
{
    public class LearningPathMetaDataRepository : ILearningPathMetaDataRepository
    {
        public LTCoreDbContext context { get; set; }
        public LearningPathMetaDataRepository(LTCoreDbContext context)
        {
            this.context = context;
        }

        public async Task<InsertionResponse<LPMetadataDTO>> InsertLPMetaData(LPMetadataDTO lp)
        {
            try
            {
                var metaData = new LearningPathMetaData() {
                LPCode = lp.LPCode,
                Title = lp.Title,
                SubTitle = lp.SubTitle,
                Description = lp.Description,
                UserId = lp.UserId
                };
                
                context.Add(metaData);
                await context.SaveChangesAsync();

                return new InsertionResponse<LPMetadataDTO> 
                {
                    InsertionErrored = false,
                    InsertionSucceded = true,
                    ReturnEntity = null
                };
            }
            catch (Exception ex)
            {
                var existingMetaData = await this.ReadLPMetaData(lp.UserId, lp.Title);
                
                if (existingMetaData != null) 
                {
                    return new InsertionResponse<LPMetadataDTO>
                    {
                        InsertionErrored = true,
                        InsertionSucceded = false,
                        ReturnEntity = existingMetaData
                    };
                } else {
                    throw ex;
                }                
            }
        }

        private async Task<LPMetadataDTO> ReadLPMetaData(string userId, string lpTitle)
        {
            try
            {
                var lpMetaData = await context.LearningPathMetaData!.AsNoTracking().SingleAsync(lp => lp.UserId == userId && lp.Title == lp.Title);
                return new LPMetadataDTO 
                {
                    LPCode = lpMetaData.LPCode,
                    UserId = lpMetaData.UserId,
                    Title = lpMetaData.Title,
                    SubTitle = lpMetaData.SubTitle,
                    Description = lpMetaData.Description
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}