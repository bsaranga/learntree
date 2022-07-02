using lt_core_application.DTOs;
using lt_core_persistence.Interfaces.Repositories;
using lt_core_persistence.Models;

namespace lt_core_persistence.Repositories
{
    public class LearningPathMetaDataRepository : ILearningPathMetaDataRepository
    {
        public LTCoreDbContext context { get; set; }
        public LearningPathMetaDataRepository(LTCoreDbContext context)
        {
            this.context = context;
        }

        public async Task InsertLPMetaData(LPMetadataDTO lp)
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
        }
    }
}