using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Neo4j.Driver;

namespace learntree_graph.infrastructure
{
    public interface IAuraDbConnection
    {
        IDriver GetDriverInstance();
    }
}