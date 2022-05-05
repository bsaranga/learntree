using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learntree_graph.infrastructure.Repositories
{
    public interface IGraphCore
    {
        Task CreateNode(string label, Dictionary<string, string> properties);
        Task DetachDeleteAllNodes();
    }
}