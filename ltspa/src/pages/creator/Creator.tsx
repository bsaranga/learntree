import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, Connection, Node, Edge, EdgeChange, NodeChange, useReactFlow } from 'react-flow-renderer';
import initialEdges from './data/edges';
import initialNodes from './data/nodes';
import '../../components/Layout.scss';
import { MouseEvent as ReactMouseEvent, useCallback, useMemo, useState } from 'react';
import PaneContextMenu from './components/PaneContextMenu';
import ContextMenuMetaData from './interfaces/ContextMenuMetaData';
import RootNode from './components/nodes/RootNode';

export default function Creator() {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);
	const [contextMenuVisible, setContextMenuVisibility] = useState<boolean>(false);
	const [contextMenuMetaData, setContextMenuMetaData] = useState<ContextMenuMetaData>({});

	const nodeTypes = useMemo(() => ({ root: RootNode }), []);

	const reactFlowInstance = useReactFlow();

	/*
	const onNodesChange = useCallback(
		(changes: NodeChange[]) => {
			setNodes((nds) => applyNodeChanges(changes, nds));
		},
		[setNodes]
	);
	
	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) => {
			setEdges((eds) => applyEdgeChanges(changes, eds));
		},
		[setEdges]
	);

	const onConnect = useCallback(
		(connection: Connection) => {
			setEdges((eds) => addEdge(connection, eds));
		},
		[setEdges]
	);
	*/

	function mainContextMenu(event: ReactMouseEvent) {
		event.preventDefault();
		setContextMenuMetaData({type: 'Pane', x: event.clientX - 2, y: event.clientY - 2});
		setContextMenuVisibility(true);
	}

	return (
		<>
			<PaneContextMenu visibility={contextMenuVisible} visibilityOff={() => setContextMenuVisibility(false)} contextMenuMetaData={contextMenuMetaData} reactFlowInstance={reactFlowInstance}/>
			<div style={{height: 'calc(100vh - 3rem)', width: '100vw'}}>
				<ReactFlow 
					defaultNodes={nodes} 
					defaultEdges={edges}
					onlyRenderVisibleElements
					onPaneContextMenu={mainContextMenu}
					nodeTypes={nodeTypes}
				>
					<Background/>
				</ReactFlow>
			</div>
		</>
	);
}