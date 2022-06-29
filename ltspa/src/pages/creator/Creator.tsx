import ReactFlow, { Background, Node, Edge, useReactFlow, XYPosition, getEdgeCenter, MarkerType } from 'react-flow-renderer';
import { KeyboardEvent, MouseEvent as ReactMouseEvent, useCallback, useMemo, useRef, useState } from 'react';
import PaneContextMenu from './components/PaneContextMenu';
import ContextMenuMetaData from './interfaces/ContextMenuMetaData';
import RootNode from './components/nodes/RootNode';
import TopicNode from './components/nodes/TopicNode';
import { Modal } from 'antd';
import CreateLPForm from '../../components/LPathCreator/CreateLPForm/CreateLPForm';
import { useNavigate } from 'react-router-dom';

interface EdgeInfo {
	id?: string,
	source?: string,
	target?: string,
	textBoxLocation?: XYPosition
	active: boolean,
	label?: string
}

interface HoveredEdge {
	id?: string,
	location?: XYPosition
	active: boolean
}

export default function Creator() {
	const navigate = useNavigate();
	const heightPadding = 3; // rem
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges1] = useState<Edge[]>([]);
	const [contextMenuVisible, setContextMenuVisibility] = useState<boolean>(false);
	const [contextMenuMetaData, setContextMenuMetaData] = useState<ContextMenuMetaData>({});
	const [activeEdgeInfo, setActiveEdgeInfo] = useState<EdgeInfo>({ active: false });

	const [createModalVisible, setCreateModalVisibility] = useState(true);
	
	const {getNodes, addNodes, getEdges, setEdges, project, toObject} = useReactFlow();
	const nodeTypes = useMemo(() => ({ root: RootNode, topic: TopicNode }), []);

	const textBox = useRef<HTMLInputElement>(null);
	const timeOut1 = useRef<any>();

	function mainContextMenu(event: ReactMouseEvent) {
		const projected = project({x: event.clientX as number, y: event.clientY as number - (heightPadding * 14)});
		event.preventDefault();
		setContextMenuMetaData({type: 'Pane', x: event.clientX - 2, y: event.clientY - 2, projX: projected.x, projY: projected.y});
		setContextMenuVisibility(true);
	}

	const edgeDblClickHandler = useCallback((event: ReactMouseEvent<Element, MouseEvent>, edge: Edge) => {
		
		setActiveEdgeInfo(
			{ 
				id: edge.id, 
				source: edge.source, 
				target: edge.target, 
				textBoxLocation: {x: event.clientX, y: event.clientY},
				label: edge?.label?.toString() ?? '',
				active: true 
			});

		timeOut1.current = setTimeout(() => {
			textBox.current?.focus();
		}, 0);

	}, []);

	const onEdgeInfoChange = useCallback((event: KeyboardEvent) => {
		if (event.code != 'Enter' && event.code != 'NumpadEnter') {
			setActiveEdgeInfo({...activeEdgeInfo, label: `${(event.target as HTMLInputElement).value}`, active: true});
		} else {
			setEdges(getEdges().map(e => {
				if (e.id == activeEdgeInfo.id) e.label = activeEdgeInfo.label;
				return e;
			}));
			setActiveEdgeInfo({active: false});
			clearTimeout(timeOut1.current);
		}
	}, [activeEdgeInfo]);

	const onTextBoxBlur = useCallback(() => {
		setActiveEdgeInfo({active: false});
		clearTimeout(timeOut1.current);
	}, []);

	const saveHandler = useCallback(() => {
		console.log('Save Graph Data');
		console.log(toObject());
	}, []);

	function navigateHome() {
		navigate('/');
	}

	function modalOkHandler() {
		setCreateModalVisibility(false);
	}

	function modalCancelHandler() {
		setCreateModalVisibility(false);
		navigateHome();
	}

	useMemo(() => console.log('Creator rendered...'), []);

	return (
		<>
			<Modal title="Create Learning Path" visible={createModalVisible} width={450} centered={true} destroyOnClose={true} transitionName='' closable={false} footer={null}>
				<CreateLPForm onCancel={modalCancelHandler} onOk={modalOkHandler}/>
			</Modal>
			<div className='absolute z-10 mb-12 bottom-6 left-6 bg-slate-50 bg-opacity-50 hover:bg-opacity-100 transition-color duration-200 px-2 rounded-sm shadow-sm'>
				<div className='select-none text-base font-semibold text-slate-700'>Learning Path Title</div>
			</div>
			<button className='absolute bg-white z-10 border-2 border-gray-500 shadow-md rounded-md p-2 focus:outline-none' onClick={() => console.log(toObject())}>Show Context</button>
			{/*-----------------------------------------------------------------------------------------*/}
			<div className='absolute z-10 bg-white bottom-6 left-6 flex p-2 justify-between space-x-4 rounded-sm px-4 shadow-md'>
				<button className='bg-slate-400 px-2 py-1 focus:outline-none rounded-sm text-xs font-semibold text-white hover:bg-slate-300 active:bg-slate-400 transition-color duration-100'>Undo</button>
				<button className='bg-slate-400 px-2 py-1 focus:outline-none rounded-sm text-xs font-semibold text-white hover:bg-slate-300 active:bg-slate-400 transition-color duration-100'>Redo</button>
				<button className='bg-slate-400 px-2 py-1 focus:outline-none rounded-sm text-xs font-semibold text-white hover:bg-slate-300 active:bg-slate-400 transition-color duration-100' onClick={saveHandler}>Save</button>
			</div>
			{ activeEdgeInfo.active && 
				<div className='absolute z-10' style={{top: `${activeEdgeInfo.textBoxLocation?.y}px`, left: `${activeEdgeInfo.textBoxLocation?.x}px`}}>
					<input ref={textBox} onKeyUp={onEdgeInfoChange} onBlur={onTextBoxBlur} type="text" defaultValue={activeEdgeInfo.label} className='p-[2px] rounded-sm focus:outline-none border-2 border-slate-600' />
				</div> 
			}
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
					defaultEdgeOptions={{style: {strokeWidth: '2.5px'}, markerEnd: {type: MarkerType.ArrowClosed}}}
					connectionLineStyle={{strokeWidth: '2.5px'}}
					onEdgeDoubleClick={edgeDblClickHandler}
				>
					<Background/>
				</ReactFlow>
			</div>
		</>
	);
}