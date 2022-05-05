using ltgraph.domain.DTOs;
using ltgraph.domain.Interfaces;
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
        public Task CreateLearningPath(LearningPath lpath)
        {
            return Task.CompletedTask;
        }
    }
}