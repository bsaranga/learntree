using lt_core_application.DTOs;
using lt_core_infrastructure.Models;

namespace lt_core_infrastructure.Repositories
{
    public class LearningPathRepository : ILearningPathRepository
    {
        public LTCoreDbContext context { get; set; }
        public LearningPathRepository(LTCoreDbContext context)
        {
            this.context = context;
        }

        public async Task InsertLearningPath(LPDto lp)
        {
            var learningPath = new LearningPath() {
                LPCode = lp.LPCode,
                Title = lp.Title,
                Description = lp.Description
            };
            
            context.Add(learningPath);
            await context.SaveChangesAsync();
        }
    }
}