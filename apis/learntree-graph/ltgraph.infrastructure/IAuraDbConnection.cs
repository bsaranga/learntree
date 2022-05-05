using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Neo4j.Driver;

namespace ltgraph.infrastructure
{
    public interface IAuraDbConnection
    {
        IDriver GetDriverInstance();
    }
}