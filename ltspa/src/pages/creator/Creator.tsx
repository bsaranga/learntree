/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
import { message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import RootNode from './components/nodes/RootNode';
import HttpService from '../../services/HttpService';
import TopicNode from './components/nodes/TopicNode';
import PaneContextMenu from './components/PaneContextMenu';
import ContextMenuMetaData from './interfaces/ContextMenuMetaData';
import useLPathStore from '../../store/learningPathStore/learningPathStore';
import CreateLPForm from '../../components/LPathCreator/CreateLPForm/CreateLPForm';
import { KeyboardEvent, MouseEvent as ReactMouseEvent, useCallback, useMemo, useRef, useState } from 'react';
import useGraphStore, { addEdge, deleteEdge, deleteNode, flushEventStore, setEdgeLabel, updateNode } from '../../store/graphStore/graphStore';
import ReactFlow, { Background, Node, Edge, useReactFlow, XYPosition, MarkerType, NodeChange, EdgeChange, Connection } from 'react-flow-renderer';

interface EdgeInfo {
	id?: string,
	source?: string,
	target?: string,
	textBoxLocation?: XYPosition
	active: boolean,
	label?: string
}

export default function Creator() {
	
	const GRAPH_SAVE_THRESHOLD = 10;
	const navigate = useNavigate();
	const httpClient = HttpService.client();
	const eventStore = useGraphStore(state => state.eventStore);
	const eventStoreDispatch = useGraphStore(state => state.dispatch);

	const heightPadding = 3; // rem
	const nodes = useRef([] as Node[]);
	const edges = useRef([] as Edge[]);

	const nodeDelta = useRef({} as NodeChange);

	const [contextMenuVisible, setContextMenuVisibility] = useState<boolean>(false);
	const [activeEdgeInfo, setActiveEdgeInfo] = useState<EdgeInfo>({ active: false });
	const [contextMenuMetaData, setContextMenuMetaData] = useState<ContextMenuMetaData>({});

	const learningPathMetaData = useLPathStore(state => state.activeLPath);
	const [createModalVisible, setCreateModalVisibility] = useState<boolean>(true && (learningPathMetaData.lPathName == undefined && learningPathMetaData.lPathDescription == undefined));
	
	const { getNode, getEdges, setEdges, project, toObject} = useReactFlow();
	const nodeTypes = useMemo(() => ({ root: RootNode, topic: TopicNode }), []);

	const edgeLabelInput = useRef<HTMLInputElement>(null);
	const edgeLabelTimeout = useRef<any>();

	function mainContextMenu(event: ReactMouseEvent) {
		event.preventDefault();
		const projected = project({x: event.clientX as number, y: event.clientY as number - (heightPadding * 14)});
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

		edgeLabelTimeout.current = setTimeout(() => {
			edgeLabelInput.current?.focus();
		}, 0);

	}, []);

	const onEdgeInfoChange = useCallback((event: KeyboardEvent) => {
		if (event.code != 'Enter' && event.code != 'NumpadEnter') {
			setActiveEdgeInfo({...activeEdgeInfo, label: `${(event.target as HTMLInputElement).value}`, active: true});
		} else {
			if (edgeLabelInput.current != null && edgeLabelInput.current.value.length < 3) {
				message.error({ content: 'Edge label must be atleast 3 characters', duration: 2, style: { marginTop: '2rem' } });
			} else {
				setEdges(getEdges().map(e => {
					if (e.id == activeEdgeInfo.id) {
						e.label = activeEdgeInfo.label;
						eventStoreDispatch({type: setEdgeLabel, payload: {delta: e}});
					}
					return e;
				}));
				setActiveEdgeInfo({active: false});
				clearTimeout(edgeLabelTimeout.current);
			}
		}
	}, [activeEdgeInfo, getEdges, setEdges, eventStoreDispatch]);

	const onTextBoxBlur = useCallback(() => {
		setActiveEdgeInfo({active: false});
		clearTimeout(edgeLabelTimeout.current);
	}, []);

	const saveHandler = useCallback(async () => {
		await httpClient.post('https://localhost:4155/api/LPath/eventstore', eventStore);
		eventStoreDispatch({type: flushEventStore, payload: { delta: {} }});
	}, [httpClient, eventStore, eventStoreDispatch]);

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

	const onNodesChange = useCallback((nodeChanges: NodeChange[]) => {
		nodeChanges.forEach(delta => {
			/*-----Position Update------*/
			if (delta.type == 'position') {
				if (delta.position != null) {
					nodeDelta.current = delta;
				}
				if (delta.dragging == false) {
					eventStoreDispatch({ type: updateNode, payload: { delta: getNode((nodeDelta.current as Node).id) } });
				}
			}

			/*-----Delete Node------*/
			if (delta.type == 'remove') {
				eventStoreDispatch({type: deleteNode, payload: { delta: delta.id }});
			}
		});
	}, [eventStoreDispatch, getNode]);

	const onEdgeChange = useCallback((edgeChanges: EdgeChange[]) => {
		edgeChanges.forEach(delta => {
			if (delta.type == 'remove') {
				eventStoreDispatch({type: deleteEdge, payload: {delta: delta.id}});
			}
		});
	}, [eventStoreDispatch]);

	const onEdgeConnect = useCallback((connection: Connection) => {
		const edge = getEdges().filter(e => e.source == connection.source && e.target == connection.target)[0];
		eventStoreDispatch({type: addEdge, payload: {delta: edge}});
	}, [getEdges, eventStoreDispatch]);

	useMemo(() => useGraphStore.subscribe(async store => {
		if (store.overflow || store.eventStore.length == GRAPH_SAVE_THRESHOLD) {
			const storeCopy = store.eventStore;
			await httpClient.post('https://localhost:4155/api/LPath/eventstore', storeCopy)
				.then(() => {
					eventStoreDispatch({type: flushEventStore, payload: { delta: storeCopy }});
				});
		}
	}), [eventStoreDispatch, httpClient]);

	useMemo(() => console.log('Creator rendered...'), []);

	return (
		<>
			<Modal title="Create Learning Path" visible={createModalVisible} width={450} centered={true} destroyOnClose={true} transitionName='' closable={false} footer={null}>
				<CreateLPForm onCancel={modalCancelHandler} onOk={modalOkHandler}/>
			</Modal>
			<div className='absolute z-10 mb-12 bottom-6 left-6 bg-slate-50 bg-opacity-50 hover:bg-opacity-100 transition-color duration-200 px-2 rounded-sm shadow-sm'>
				<div className='select-none text-base font-semibold text-slate-700'>{learningPathMetaData.lPathName}</div>
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
					<input ref={edgeLabelInput} onKeyUp={onEdgeInfoChange} onBlur={onTextBoxBlur} type="text" defaultValue={activeEdgeInfo.label} className='p-[2px] rounded-sm focus:outline-none border-2 border-slate-600' />
				</div> 
			}
			{ contextMenuVisible && <PaneContextMenu visibilityOff={() => setContextMenuVisibility(false)} contextMenuMetaData={contextMenuMetaData} /> }
			<div style={{height: `calc(100vh - ${heightPadding}rem)`, width: '100vw'}}>
				<ReactFlow 
					defaultZoom={1}
					nodeTypes={nodeTypes}
					deleteKeyCode='Delete'
					elementsSelectable={true}
					defaultNodes={nodes.current}
					defaultEdges={edges.current}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgeChange}
					onConnect={onEdgeConnect}
					onPaneContextMenu={mainContextMenu}
					onEdgeDoubleClick={edgeDblClickHandler}
					connectionLineStyle={{strokeWidth: '2.5px'}}
					defaultEdgeOptions={{style: {strokeWidth: '2.5px'}, markerEnd: {type: MarkerType.ArrowClosed}}}
				>
					<Background/>
				</ReactFlow>
			</div>
		</>
	);
}