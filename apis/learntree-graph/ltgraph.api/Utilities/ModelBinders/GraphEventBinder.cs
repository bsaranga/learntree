using System.Text.Json;
using System.Text.Json.Nodes;
using ltgraph.domain.Interfaces;
using ltgraph.domain.Models.Graph;
using ltgraph.domain.Models.Graph.EventTypes;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ltgraph.Utilities.ModelBinders
{
    public class GraphEventBinder : IModelBinder
    {
        private readonly IClaimInfo claimInfo;
        private const string TYPEFIELD = "type";
        private const string DELTAFIELD = "delta";
        private const string ADD_METADATA = "ADD_METADATA";
        private const string ADD_NODE = "ADD_NODE";
        private const string UPDATE_NODE = "UPDATE_NODE";
        private const string ADD_EDGE = "ADD_EDGE";
        private const string DELETE_NODE = "DELETE_NODE";
        private const string DELETE_EDGE = "DELETE_EDGE";
        private const string SET_EDGE_LABEL = "SET_EDGE_LABEL";

        public GraphEventBinder(IClaimInfo claimInfo)
        {
            this.claimInfo = claimInfo;
        }

        public async Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var bodyStr = "";
            var httpRequestBody = bindingContext.HttpContext.Request.Body;
            var model = new List<GraphEvent>();
                        
            using(StreamReader reader = new StreamReader(httpRequestBody))
            {
                bodyStr = await reader.ReadToEndAsync();
            }

            var parsed = JsonNode.Parse(bodyStr);

            foreach (var set in parsed!.AsArray())
            {
                if (set![TYPEFIELD]!.ToString() == ADD_METADATA) 
                {
                    var json = set![DELTAFIELD]!.ToJsonString();
                    var metaObject = JsonSerializer.Deserialize<Metadata>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    metaObject!.LPathUserId = claimInfo.GetUserId();
                    model.Add(new GraphEvent<Metadata> {Type = ADD_METADATA, Delta = metaObject});
                }

                if (set![TYPEFIELD]!.ToString() == ADD_NODE)
                {
                    var json = set![DELTAFIELD]!.ToJsonString();
                    var nodeObject = JsonSerializer.Deserialize<Node>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    model.Add(new GraphEvent<Node> {Type = ADD_NODE, Delta = nodeObject});
                }

                if (set![TYPEFIELD]!.ToString() == UPDATE_NODE)
                {
                    var json = set![DELTAFIELD]!.ToJsonString();
                    var nodeObject = JsonSerializer.Deserialize<Node>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    model.Add(new GraphEvent<Node> {Type = UPDATE_NODE, Delta = nodeObject});
                }

                if (set![TYPEFIELD]!.ToString() == ADD_EDGE)
                {
                    var json = set![DELTAFIELD]!.ToJsonString();
                    var edgeObject = JsonSerializer.Deserialize<Edge>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    model.Add(new GraphEvent<Edge> {Type = ADD_EDGE, Delta = edgeObject});
                }

                if (set![TYPEFIELD]!.ToString() == SET_EDGE_LABEL)
                {
                    var json = set![DELTAFIELD]!.ToJsonString();
                    var edgeObject = JsonSerializer.Deserialize<Edge>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    model.Add(new GraphEvent<Edge> {Type = SET_EDGE_LABEL, Delta = edgeObject});
                }

                if (set![TYPEFIELD]!.ToString() == DELETE_NODE)
                {
                    var json = set![DELTAFIELD]!.ToJsonString();
                    var nodeId = JsonSerializer.Deserialize<string>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    model.Add(new GraphEvent<string> {Type = DELETE_NODE, Delta = nodeId});
                }

                if (set![TYPEFIELD]!.ToString() == DELETE_EDGE)
                {
                    var json = set![DELTAFIELD]!.ToJsonString();
                    var edgeId = JsonSerializer.Deserialize<string>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    model.Add(new GraphEvent<string> {Type = DELETE_EDGE, Delta = edgeId});
                }
            }

            bindingContext.Result = ModelBindingResult.Success(model);
        }
    }
}