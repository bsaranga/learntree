using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Neo4j.Driver;

namespace ltgraph.infrastructure
{
    public class AuraDbConnection : IAuraDbConnection, IDisposable
    {
        private bool disposed = false;
        private readonly ILogger<AuraDbConnection> _logger;
        private readonly IConfiguration _configuration;
        private readonly string uri;
        private readonly string user;
        private readonly string password;
        private IDriver? _driver;
        public AuraDbConnection(ILogger<AuraDbConnection> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;

            uri = _configuration.GetSection("Neo4jConnection:Uri").Value;
            user = _configuration.GetSection("Neo4jConnection:User").Value;
            password = _configuration.GetSection("Neo4jConnection:Password").Value;

            _driver = GraphDatabase.Driver(uri, AuthTokens.Basic(user, password), options => {
                options.WithMaxIdleConnectionPoolSize(500);
            });
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing) 
        {
            if (disposed) return;

            if (disposing) 
            {
                _logger.LogInformation("Disposing neo4j driver...");
                _driver!.Dispose();
            }

            disposed = true;

            _logger.LogInformation("Finalized...");
        }

        ~AuraDbConnection() => Dispose(false);

        public IDriver GetDriverInstance()
        {
            return _driver!;
        }
    }
}