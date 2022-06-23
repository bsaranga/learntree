using lt_core_application.DTOs;

namespace lt_core_persistence.Queries.Interfaces
{
    public interface ILookupQuery
    {
        IEnumerable<TopicDTO> GetAllTopics();
    }
}