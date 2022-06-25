import { ReactFlowInstance } from 'react-flow-renderer';
import {v4 as uuidv4} from 'uuid';
import ContextMenuMetaData from '../interfaces/ContextMenuMetaData';

interface ContextMenuProps {
    contextMenuMetaData: ContextMenuMetaData
    visibility: boolean
    visibilityOff: () => void
    reactFlowInstance: ReactFlowInstance<any, any>
}

/* eslint-disable no-mixed-spaces-and-tabs */
export default function PaneContextMenu(props: ContextMenuProps) {

	const { contextMenuMetaData } = props;
	const { visibility } = props;
	const { visibilityOff } = props;
	const { reactFlowInstance } = props;

	function AddRootNode() {
		(reactFlowInstance as ReactFlowInstance).addNodes({ id: uuidv4(), type: 'root', position: { x: contextMenuMetaData.x as number, y: contextMenuMetaData.y as number }, data: {label: uuidv4()} });
        
		console.log((reactFlowInstance as ReactFlowInstance).getNodes());
		visibilityOff();
	}

	function AddAggregateNode() {
		console.log('Aggregate node added');
		visibilityOff();
	}

	function AddTopicNode() {
		console.log('Topic node added');
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
		<>
			{
				visibility &&
                <div onMouseLeave={visibilityOff} style={{ top: `${contextMenuMetaData.y}px`, left: `${contextMenuMetaData.x}px` }} className='absolute bg-white rounded-md overflow-hidden z-10 shadow-md flex flex-col'>
                	<div className="text-xs hover:bg-blue-300 py-2 px-3 active:bg-blue-500 select-none" onClick={AddRootNode}>Add Root</div>
                	<div className="text-xs hover:bg-blue-300 py-2 px-3 active:bg-blue-500 select-none" onClick={AddAggregateNode}>Add Aggregate</div>
                	<div className="text-xs hover:bg-blue-300 py-2 px-3 active:bg-blue-500 select-none" onClick={AddTopicNode}>Add Topic</div>
                	<div className="text-xs hover:bg-blue-300 py-2 px-3 active:bg-blue-500 select-none" onClick={AddInfoNode}>Add Info</div>
                	<div className="text-xs hover:bg-blue-300 py-2 px-3 active:bg-blue-500 select-none" onClick={AddQuizNode}>Add Quiz</div>
                </div>
			}
		</>
	);
}