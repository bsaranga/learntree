using System.Runtime.Serialization;

namespace ltgraph.domain.Models.Enums
{
    public enum NodeType
    {
        [EnumMember(Value = "root")]
        Root,
        [EnumMember(Value = "topic")]
        Topic,
    }
}
