import { useRef } from 'react';
import {v4 as uuidv4} from 'uuid';
import { useReactFlow } from 'react-flow-renderer';
import ContextMenuMetaData from '../interfaces/ContextMenuMetaData';

interface ContextMenuProps {
    contextMenuMetaData: ContextMenuMetaData
    visibilityOff: () => void
}

/* eslint-disable no-mixed-spaces-and-tabs */
export default function PaneContextMenu(props: ContextMenuProps) {

	const { visibilityOff } = props;
	const { contextMenuMetaData } = props;
	const {getNodes, addNodes } = useReactFlow();
	const rootMenuItem = useRef<HTMLButtonElement>(null);

	let rootExists = false;

	if (getNodes().filter(n => n.type == 'root').length > 0) rootExists = true;

	function AddRootNode() {
		const node = { id: uuidv4(), type: 'root', position: { x: (contextMenuMetaData.projX as number), y: (contextMenuMetaData.projY as number) }, data: {label: ''} };
		addNodes(node);
		visibilityOff();
	}

	function AddTopicNode() {
		const node = { id: uuidv4(), type: 'topic', position: { x: (contextMenuMetaData.projX as number), y: (contextMenuMetaData.projY as number) }, data: {label: ''} };
		addNodes(node);
		visibilityOff();
	}

	function AddInfoNode() {
		console.log('Info node added');
		visibilityOff();
	}

	function AddQuizNode() {
		console.log('Quiz node added');
		visibilityOff();
	}

	return (
		<div onPointerLeave={visibilityOff} style={{ top: `${contextMenuMetaData.y}px`, left: `${contextMenuMetaData.x}px` }} className='absolute bg-white rounded-md overflow-hidden z-10 shadow-md flex flex-col'>
			<button disabled={rootExists} ref={rootMenuItem} className="text-xs hover:bg-blue-300 disabled:hover:bg-gray-400 disabled:text-gray-500 py-2 px-4 focus:outline-none active:bg-blue-500 select-none text-left" onClick={AddRootNode}>Add Root</button>
			<button className="text-xs hover:bg-blue-300 py-2 px-4 focus:outline-none active:bg-blue-500 select-none text-left" onClick={AddTopicNode}>Add Topic</button>
			<button className="text-xs hover:bg-blue-300 py-2 px-4 focus:outline-none active:bg-blue-500 select-none text-left" onClick={AddInfoNode}>Add Info</button>
			<button className="text-xs hover:bg-blue-300 py-2 px-4 focus:outline-none active:bg-blue-500 select-none text-left" onClick={AddQuizNode}>Add Quiz</button>
		</div>
	);
}