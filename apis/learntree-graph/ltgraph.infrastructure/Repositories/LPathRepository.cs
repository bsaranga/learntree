using ltgraph.domain.DTOs;
using ltgraph.domain.Interfaces;
using ltgraph.infrastructure.ExtensionMethods;
using Microsoft.Extensions.Logging;
using Neo4j.Driver;

namespace ltgraph.infrastructure.Repositories
{
    public class LPathRepository : ILPathRepository
    {
        private IDriver _dbDriver;
        private IAuraDbConnection? connection;
        private ILogger<LPathRepository> logger;
        public LPathRepository(IAuraDbConnection connection, ILogger<LPathRepository> logger)
        {
            this.connection = connection;
            this.logger = logger;
            _dbDriver = connection.GetDriverInstance();
        }

        public IResultSummary AddRootNode(string name)
        {
            throw new NotImplementedException();
        }

        public async Task CreateLearningPath(Node lpath)
        {
            var session = _dbDriver.AsyncSession();
            var allChildren = lpath.Children!.Descendants(p => p.Children!);

            try
            {
                await session.WriteTransactionAsync(async tx => {
                    await tx.RunAsync("MERGE (x:LPath {name: $name, type: $type})", new {name = lpath.Name, type = lpath.NodeType.ToString()});
                });
            }
            catch(Exception ex) {
                logger.LogError(ex.Message);
            }
            finally
            {
                await session.CloseAsync();
            }
        }
    }
}