using System.Runtime.Serialization;

namespace ltgraph.domain.Models.Enums
{
    public enum NodeType
    {
        [EnumMember(Value = "prerequisite")]
        Prerequisite,
        [EnumMember(Value = "root")]
        Root,
        [EnumMember(Value = "aggregate")]
        Aggregate,
        [EnumMember(Value = "topic")]
        Topic,
    }
}
