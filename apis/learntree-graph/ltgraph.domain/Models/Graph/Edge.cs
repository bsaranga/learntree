namespace ltgraph.domain.Models.Graph
{
    public class Edge
    {
        public string? Id { get; set; }
        public string? Source { get; set; }
        public string? Target { get; set; }
        public EdgeStyleAttr? Style { get; set; }
        public EdgeMarker? MarkerEnd { get; set; }
    }
}

/*
{
    "edges": [
        {
            "style": {
                "strokeWidth": "2.5px"
            },
            "markerEnd": {
                "type": "arrowclosed"
            },
            "source": "1efabe46-110f-4070-8808-e04e5bfa5335",
            "sourceHandle": "a",
            "target": "715eec78-33a4-4ad4-ba7d-3336c26edeab",
            "targetHandle": null,
            "id": "reactflow__edge-1efabe46-110f-4070-8808-e04e5bfa5335a-715eec78-33a4-4ad4-ba7d-3336c26edeab"
        },
        {
            "style": {
                "strokeWidth": "2.5px"
            },
            "markerEnd": {
                "type": "arrowclosed"
            },
            "source": "1efabe46-110f-4070-8808-e04e5bfa5335",
            "sourceHandle": "a",
            "target": "f000323c-6329-4795-899a-1e3f1553803c",
            "targetHandle": null,
            "id": "reactflow__edge-1efabe46-110f-4070-8808-e04e5bfa5335a-f000323c-6329-4795-899a-1e3f1553803c"
        },
        {
            "style": {
                "strokeWidth": "2.5px"
            },
            "markerEnd": {
                "type": "arrowclosed"
            },
            "source": "1efabe46-110f-4070-8808-e04e5bfa5335",
            "sourceHandle": "a",
            "target": "98ed7545-fb4c-4a77-84fe-dd150f439064",
            "targetHandle": null,
            "id": "reactflow__edge-1efabe46-110f-4070-8808-e04e5bfa5335a-98ed7545-fb4c-4a77-84fe-dd150f439064"
        }
    ]
}
*/