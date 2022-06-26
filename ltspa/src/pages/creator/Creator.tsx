import ReactFlow, { Background, Node, Edge, useReactFlow } from 'react-flow-renderer';
import { MouseEvent as ReactMouseEvent, useMemo, useState } from 'react';
import PaneContextMenu from './components/PaneContextMenu';
import ContextMenuMetaData from './interfaces/ContextMenuMetaData';
import RootNode from './components/nodes/RootNode';
import TopicNode from './components/nodes/TopicNode';

export default function Creator() {
	const heightPadding = 3; // rem
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [contextMenuVisible, setContextMenuVisibility] = useState<boolean>(false);
	const [contextMenuMetaData, setContextMenuMetaData] = useState<ContextMenuMetaData>({});
	const {getNodes, addNodes, project} = useReactFlow();

	const nodeTypes = useMemo(() => ({ root: RootNode, topic: TopicNode }), []);

	function mainContextMenu(event: ReactMouseEvent) {
		const projected = project({x: event.clientX as number, y: event.clientY as number - (heightPadding * 14)});
		event.preventDefault();
		setContextMenuMetaData({type: 'Pane', x: event.clientX - 2, y: event.clientY - 2, projX: projected.x, projY: projected.y});
		setContextMenuVisibility(true);
	}

	useMemo(() => console.log('Creator rendered...'), []);

	return (
		<>
			<button className='absolute bg-white z-10 border-2 border-gray-500 shadow-md rounded-md p-2 focus:outline-none' onClick={() => console.log(getNodes())}>Show Context</button>
			{ contextMenuVisible && <PaneContextMenu visibilityOff={() => setContextMenuVisibility(false)} contextMenuMetaData={contextMenuMetaData} addNodes={addNodes} getNodes={getNodes}/> }
			<div style={{height: `calc(100vh - ${heightPadding}rem)`, width: '100vw'}}>
				<ReactFlow 
					defaultNodes={nodes}
					defaultEdges={edges}
					onPaneContextMenu={mainContextMenu}
					nodeTypes={nodeTypes}
					defaultZoom={1}
					deleteKeyCode='Delete'
					elementsSelectable={true}
				>
					<Background/>
				</ReactFlow>
			</div>
		</>
	);
}