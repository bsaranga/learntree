import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, Connection, Node, Edge, EdgeChange, NodeChange, useReactFlow, Viewport } from 'react-flow-renderer';
import initialEdges from './data/edges';
import initialNodes from './data/nodes';
import '../../components/Layout.scss';
import { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, useCallback, useState } from 'react';

interface ContextMenuMetaData {
	x: number | null,
	y: number | null,
	type: 'Pane' | 'Node' | null
}

export default function Creator() {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);
	const [contextMenuVisible, setContextMenuVisibility] = useState<boolean>(false);
	const [contextMenuMetaData, setContextMenuMetaData] = useState<ContextMenuMetaData>({x: null, y: null, type: null});

	const reactFlowInstance = useReactFlow();

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

	function mainContextMenu(event: ReactMouseEvent) {
		event.preventDefault();
		setContextMenuMetaData({type: 'Pane', x: event.clientX, y: event.clientY});
		setContextMenuVisibility(true);
		console.log(event);
	}

	function paneClicked(event: ReactMouseEvent) {
		setContextMenuVisibility(false);
		console.log(event);
	}

	function paneMoved(event: MouseEvent | TouchEvent, viewport: Viewport) {
		setContextMenuVisibility(false);
	}

	return (
		<>
			{
				contextMenuVisible && <div style={{top: `${contextMenuMetaData.y}px`, left: `${contextMenuMetaData.x}px`}} className='absolute bg-white p-2 rounded-md z-10 shadow-md'>Hello Context Menu</div>
			}
			<div style={{height: 'calc(100vh - 3rem)', width: '100vw'}}>
				<ReactFlow 
					defaultNodes={nodes} 
					defaultEdges={edges}
					onNodesChange={onNodesChange} 
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onlyRenderVisibleElements
					onPaneContextMenu={mainContextMenu}
					onPaneClick={paneClicked}
					onMove={paneMoved}
				>
					<Background/>
				</ReactFlow>
			</div>
		</>
	);
}