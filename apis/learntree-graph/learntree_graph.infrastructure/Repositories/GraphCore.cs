using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Neo4j.Driver;
using Microsoft.Extensions.Logging;

namespace learntree_graph.infrastructure.Repositories
{
    public class GraphCore : IGraphCore
    {
        private IAsyncSession neo4jSession;
        private IAuraDbConnection? connection;
        private ILogger<GraphCore> logger;

        public GraphCore(IAuraDbConnection connection, ILogger<GraphCore> logger)
        {
            this.logger = logger;
            this.connection = connection;
            this.neo4jSession = this.connection.EstablishConnection().GetAsyncSession();
        }
        
        public async Task CreateNode(string label, Dictionary<string, string> properties)
        {
            var query = $"MERGE(x:{label} {{{GetPropertyString(properties)}}}) RETURN x";
            try
            {
                var writeResult = await neo4jSession.WriteTransactionAsync(async tx => {
                    var result = await tx.RunAsync(query);
                    return await result.SingleAsync();
                });

                var createdNode = writeResult["x"].As<INode>();
                logger.LogInformation($"Created node with id: {createdNode.Id}, label: {createdNode.Labels[0]}, properties: {string.Join(",", createdNode.Properties)}");
            }
            catch (Neo4jException ex)
            {
                logger.LogError(ex.Message);
                throw;
            }
        }

        public Task CreateNode<T>(string label, Dictionary<string, T> properties)
        {
            throw new NotImplementedException();
        }

        public async Task DetachDeleteAllNodes()
        {
            var query = "MATCH (n) DETACH DELETE n";
            try
            {
                var detachDeleteResult = await neo4jSession.RunAsync(query);
            }
            catch (Neo4jException ex)
            {
                logger.LogError(ex.Message);
                throw;
            }
        }

        // Utils

        private string GetPropertyString<T>(Dictionary<string, T> props)
        {
            string properties = "";

            switch (Type.GetTypeCode(typeof(T)))
            {
                case TypeCode.DateTime:
                    foreach (var kvp in props) {
                        properties += $"{kvp.Key}: datetime({((DateTime)(object)kvp.Value!).ToString("yyyy-mm-ddThh:mm:ss")})";
                    }
                    break;
                case TypeCode.Int32 or TypeCode.Decimal or TypeCode.Boolean:
                    foreach (var kvp in props) {
                        properties += $"{kvp.Key}: {kvp.Value}";
                    }
                    break;
                default:
                    foreach(var kvp in props) {
                        properties += $"{kvp.Key}: \"{kvp.Value}\", ";
                    }
                    break;
            }

            return properties.Substring(0, properties.Length - 2);
        }
    }
}