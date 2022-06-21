using lt_core_persistence.Models;
using lt_core_persistence.Queries.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace lt_core_persistence.Queries
{
    public class LookupQuery : ILookupQuery
    {
        private readonly LTCoreDbContext lTCoreDbContext;
        public LookupQuery(LTCoreDbContext lTCoreDbContext)
        {
            this.lTCoreDbContext = lTCoreDbContext;

        }
        public IEnumerable<Topic> GetAllTopics()
        {
            return lTCoreDbContext?.Topic?.AsNoTracking().AsEnumerable()!;
        }
    }
}