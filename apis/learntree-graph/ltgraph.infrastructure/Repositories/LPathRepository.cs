using Neo4j.Driver;
using ltgraph.domain.DTOs;
using ltgraph.domain.Interfaces;
using ltgraph.domain.Models.Enums;
using ltgraph.domain.Models.Graph;
using Microsoft.Extensions.Logging;
using ltgraph.domain.Models.Graph.EventTypes;
using static ltgraph.domain.Constants.GraphEventActions;

namespace ltgraph.infrastructure.Repositories
{
    public class LPathRepository : ILPathRepository
    {
        private IDriver _dbDriver;
        private IAuraDbConnection? connection;
        private ILogger<LPathRepository> logger;
        private IAsyncSession graphSession;

        public LPathRepository(IAuraDbConnection connection, ILogger<LPathRepository> logger)
        {
            this.connection = connection;
            this.logger = logger;

            _dbDriver = connection.GetDriverInstance();
            graphSession = _dbDriver.AsyncSession();
        }

        public IResultSummary AddRootNode(string name)
        {
            throw new NotImplementedException();
        }

        public async Task CreateLearningPath(domain.DTOs.NodeDTO lpath)
        {
            var session = _dbDriver.AsyncSession();
            var allChildren = lpath.Children!.SelectMany(c => c.Children!);

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

        public async Task SaveLPContext(LPathContext lPathContext)
        {
            var nodes = lPathContext.Nodes;
            var edges = lPathContext.Edges;
            var metaData = lPathContext.Metadata;
            var viewPort = lPathContext.Viewport;
            var rootNode = nodes!.Single(n => n.Type == NodeType.Root);

            try
            {
                await graphSession.WriteTransactionAsync(async tx => {
                    var metaDataQuery = new Query("MERGE (m:MetaData { lPathCode: $lPathCode, lPathName: $lPathName, lPathSubtitle: $lPathSubtitle, lPathDescription: $lPathDescription, lPathUserId: $lPathUserId })", 
                                            new {
                                                lPathCode = metaData!.LPathCode,
                                                lPathName = metaData.LPathName,
                                                lPathSubtitle = metaData.LPathSubtitle,
                                                lPathDescription = metaData.LPathDescription,
                                                lPathUserId = metaData.LPathUserId
                                            });

                    var nodeQueries = new List<Query>();
                    
                    nodes!.ToList().ForEach(n => {
                        nodeQueries.Add(new Query("MERGE (n:Node { nodeId: $nodeId, nodeType: $nodeType, position_xPos: $position_xPos, position_yPos: $position_yPos, data_label: $data_label})", new {
                            nodeId = n.Id,
                            nodeType = (int) n.Type,
                            position_xPos = n.Position!.XPosition,
                            position_yPos = n.Position.YPosition,
                            data_label = n.Data!.Label
                        }));
                    });

                    var edgeQueries = new List<Query>();

                    edges!.ToList().ForEach(e => {
                        edgeQueries.Add(new Query("MATCH (source:Node { nodeId: $sourceId }) MATCH (target:Node { nodeId: $targetId }) MERGE (source)-[r:HAS { edgeId: $edgeId, source: $source, target: $target }]->(target)", new {
                            sourceId = e.Source,
                            targetId = e.Target,
                            edgeId = e.Id,
                            source = e.Source,
                            target = e.Target
                        }));
                    });

                    var rootConnectionQuery = new Query("MATCH (meta:MetaData { lPathCode: $lPathCode }) MATCH (root:Node { nodeId: $rootId }) MERGE (meta)-[r:HAS_ROOT]->(root)", new {
                        lPathCode = metaData.LPathCode,
                        rootId = rootNode.Id
                    });

                    await tx.RunAsync(metaDataQuery);
                    nodeQueries.ForEach(async nodeQuery => await tx.RunAsync(nodeQuery));
                    edgeQueries.ForEach(async edgeQuery => await tx.RunAsync(edgeQuery));
                    await tx.RunAsync(rootConnectionQuery);
                });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task WriteGraphEvents(List<GraphEvent> GraphEvents)
        {
            try
            {
                var queries = new List<Query>();
                await graphSession.WriteTransactionAsync(async tx => {
                    GraphEvents.ForEach(ge => {
                        
                        var geType = ge.GetType();

                        #region METADATA
                        if (geType == typeof(GraphEvent<Metadata>)) 
                        {
                            var metaDataWrapper = ((GraphEvent<Metadata>)ge);
                            if (metaDataWrapper.Type == ADD_METADATA) {
                                var metaData = metaDataWrapper.Delta;
                                var addMetaDataQuery = new Query("MERGE (m:MetaData { lPathCode: $lPathCode, lPathName: $lPathName, lPathSubtitle: $lPathSubtitle, lPathDescription: $lPathDescription, lPathUserId: $lPathUserId })", 
                                            new {
                                                lPathCode = metaData!.LPathCode,
                                                lPathName = metaData.LPathName,
                                                lPathSubtitle = metaData.LPathSubtitle,
                                                lPathDescription = metaData.LPathDescription,
                                                lPathUserId = metaData.LPathUserId
                                            });

                                queries.Add(addMetaDataQuery);
                            }
                        }
                        #endregion

                        #region NODES
                        if (geType == typeof(GraphEvent<Node>)) 
                        {
                            var nodeDataWrapper = ((GraphEvent<Node>)ge);

                            // ADD NODE
                            if (nodeDataWrapper.Type == ADD_NODE) {
                                var nodeData = nodeDataWrapper.Delta;
                                var addNodeDataQuery = new Query("MERGE (n:Node { nodeId: $nodeId, nodeType: $nodeType, position_xPos: $position_xPos, position_yPos: $position_yPos, data_label: $data_label})", 
                                                new {
                                                    nodeId = nodeData!.Id,
                                                    nodeType = (int) nodeData.Type,
                                                    position_xPos = nodeData.Position!.XPosition,
                                                    position_yPos = nodeData.Position.YPosition,
                                                    data_label = nodeData.Data!.Label
                                                });

                                queries.Add(addNodeDataQuery);
                            }

                            // UPDATE NODE
                            if (nodeDataWrapper.Type == UPDATE_NODE) {
                                var nodeUpdateData = nodeDataWrapper.Delta;
                                var updateNodeDataQuery = new Query("MATCH (n: Node {nodeId: $nodeId}) SET n.position_xPos = $position_xPos, n.position_yPos = $position_yPos, n.data_label = $data_label", 
                                                new {
                                                    nodeId = nodeUpdateData!.Id,
                                                    position_xPos = nodeUpdateData.Position!.XPosition,
                                                    position_yPos = nodeUpdateData.Position.YPosition,
                                                    data_label = nodeUpdateData.Data!.Label
                                                });

                                queries.Add(updateNodeDataQuery);
                            }
                        }
                        #endregion

                        #region EDGES
                        if (geType == typeof(GraphEvent<Edge>))
                        {
                            var edgeDataWrapper = ((GraphEvent<Edge>)ge);
                            if (edgeDataWrapper.Type == ADD_EDGE) {
                                var edgeData = edgeDataWrapper.Delta;
                                var addEdgeDataQuery = new Query("MATCH (source:Node { nodeId: $sourceId }) MATCH (target:Node { nodeId: $targetId }) MERGE (source)-[r:HAS { edgeId: $edgeId, source: $source, target: $target }]->(target)", 
                                                    new {
                                                        sourceId = edgeData!.Source,
                                                        targetId = edgeData.Target,
                                                        edgeId = edgeData.Id,
                                                        source = edgeData.Source,
                                                        target = edgeData.Target
                                                    });
                                queries.Add(addEdgeDataQuery);
                            }

                            if (edgeDataWrapper.Type == SET_EDGE_LABEL) {
                                var edgeLabelData = edgeDataWrapper.Delta;
                                var setEdgeLabelQuery = new Query("MATCH (:Node)-[r:HAS {edgeId: $edgeId}]->(:Node) SET r.data_label = $edgeLabel", 
                                                    new {
                                                        edgeId = edgeLabelData!.Id, 
                                                        edgeLabel = edgeLabelData.Label
                                                    });
                                queries.Add(setEdgeLabelQuery);
                            }
                        }
                        #endregion

                        #region DELETE_OPS
                        if (geType == typeof(string))
                        {
                            var deleteOp = ((GraphEvent<string>)ge);
                            
                            //DELETE NODE
                            if (deleteOp.Type == DELETE_NODE)
                            {
                                var nodeId = deleteOp.Delta;
                                var nodeDeleteQuery = new Query("MATCH (n:Node {nodeId: $nodeId}) DELETE n", new { nodeId = nodeId});
                                queries.Add(nodeDeleteQuery);
                            }

                            //DELETE EDGE
                            if (deleteOp.Type == DELETE_EDGE)
                            {
                                var edgeId = deleteOp.Delta;
                                var edgeDeleteQuery = new Query("MATCH (n:Node)-[r:HAS {edgeId: $edgeId}]->(n1:Node) DELETE r", new { edgeId = edgeId});
                                queries.Add(edgeDeleteQuery);
                            }
                        }
                        #endregion
                    });

                    await Task.Run(() => Console.WriteLine("In progress...."));
                });
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }
    }
}