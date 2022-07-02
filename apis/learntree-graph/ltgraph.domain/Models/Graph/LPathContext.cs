namespace ltgraph.domain.Models.Graph
{
    public class LPathContext
    {
        public IEnumerable<Node>? Nodes { get; set; }
        public IEnumerable<Edge>? Edges { get; set; }
        public Viewport? Viewport { get; set; }
    }
}

/*
{
    "nodes": [
        {
            "width": 69,
            "height": 38,
            "id": "1efabe46-110f-4070-8808-e04e5bfa5335",
            "type": "root",
            "position": {
                "x": 272,
                "y": 196
            },
            "data": {
                "label": "Untitled"
            },
            "positionAbsolute": {
                "x": 272,
                "y": 196
            },
            "selected": false,
            "dragging": false
        },
        {
            "width": 69,
            "height": 38,
            "id": "715eec78-33a4-4ad4-ba7d-3336c26edeab",
            "type": "topic",
            "position": {
                "x": 466,
                "y": 363
            },
            "data": {
                "label": "Untitled"
            },
            "positionAbsolute": {
                "x": 466,
                "y": 363
            },
            "selected": false,
            "dragging": false
        },
        {
            "width": 69,
            "height": 38,
            "id": "98ed7545-fb4c-4a77-84fe-dd150f439064",
            "type": "topic",
            "position": {
                "x": 104,
                "y": 362
            },
            "data": {
                "label": "Untitled"
            },
            "positionAbsolute": {
                "x": 104,
                "y": 362
            },
            "selected": false,
            "dragging": false
        },
        {
            "width": 69,
            "height": 38,
            "id": "f000323c-6329-4795-899a-1e3f1553803c",
            "type": "topic",
            "position": {
                "x": 320,
                "y": 425
            },
            "data": {
                "label": "Untitled"
            },
            "positionAbsolute": {
                "x": 320,
                "y": 425
            },
            "selected": false,
            "dragging": false
        }
    ],
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
    ],
    "viewport": {
        "x": 171,
        "y": 39,
        "zoom": 1
    }
}
*/