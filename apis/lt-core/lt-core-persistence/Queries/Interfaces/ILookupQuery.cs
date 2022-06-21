using lt_core_persistence.Models;

namespace lt_core_persistence.Queries.Interfaces
{
    public interface ILookupQuery
    {
        IEnumerable<Topic> GetAllTopics();
    }
}