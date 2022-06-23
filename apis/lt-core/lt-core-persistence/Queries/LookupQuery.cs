using AutoMapper;
using lt_core_application.DTOs;
using lt_core_persistence.Queries.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace lt_core_persistence.Queries
{
    public class LookupQuery : ILookupQuery
    {
        private readonly IMapper mapper;
        private readonly LTCoreDbContext lTCoreDbContext;

        public LookupQuery(LTCoreDbContext lTCoreDbContext, IMapper mapper)
        {
            this.lTCoreDbContext = lTCoreDbContext;
            this.mapper = mapper;
        }
        public IEnumerable<TopicDTO> GetAllTopics()
        {
            return mapper.Map<List<TopicDTO>>(lTCoreDbContext?.Topic?.AsNoTracking().AsEnumerable()!);
        }
    }
}