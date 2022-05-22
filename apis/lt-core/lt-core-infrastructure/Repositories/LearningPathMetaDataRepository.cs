using lt_core_application.DTOs;
using lt_core_infrastructure.Models;

namespace lt_core_infrastructure.Repositories
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
                Description = lp.Description,
                UserId = lp.UserId
            };
            
            context.Add(metaData);
            await context.SaveChangesAsync();
        }
    }
}