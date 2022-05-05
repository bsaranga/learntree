using System.Runtime.Serialization;

namespace learntree_graph.domain.Models.Enums
{
    public enum NodeType
    {
        [EnumMember(Value = "prerequisite")]
        Prerequisite,
        [EnumMember(Value = "root")]
        Root,
        [EnumMember(Value = "topic")]
        Topic,
        [EnumMember(Value = "milestone")]
        Milestone
    }
}
