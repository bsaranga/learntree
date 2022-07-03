import { v4 as uuidv4 } from 'uuid';
import { useMemo, useState, useCallback } from "react";
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, Connection, Node, Edge, EdgeChange, NodeChange } from "react-flow-renderer";
import CustomNode from "./CustomNode";

function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {setNodes((nds) => applyNodeChanges(changes, nds))},
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addNode = useCallback(() => {
    const newNode = {
      id: uuidv4(),
      type: 'customNode',
      data: { label: 'Input Node'},
      position: { x: Math.random()*500, y: Math.random()*500 },
    }

    setNodes([...nodes, newNode]);
  }, [nodes]);

  const showNodes = useCallback(() => {
    console.log(nodes);
  }, [nodes]);

  const showEdges = useCallback(() => {
    console.log(edges);
  }, [edges]);

  return <div style={{width: "100vw", height: "100vh"}}>
    <div style={{position: "absolute", zIndex: 10}}>
      <button onClick={addNode}>Add Node</button>
      <button onClick={showNodes}>Show Nodes</button>
      <button onClick={showEdges}>Show Edges</button>
    </div>
    <ReactFlow
        nodes={nodes} 
        edges={edges} 
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange} 
        onEdgesChange={onEdgesChange} 
        onConnect={onConnect}
        deleteKeyCode="Delete"
        fitView>
      <Background/>
    </ReactFlow>;
  </div>
}

export default App;
