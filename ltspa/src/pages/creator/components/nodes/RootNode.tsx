import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

export default function RootNode() {
	const onChange = useCallback((evt) => {
		console.log(evt);
	}, []);

	return (
		<>
			<div className='bg-white p-2 rounded-md border-2 border-gray-300 active:border-gray-400'>
				<input id="text" name="text" onKeyUp={onChange} />
			</div>
			<Handle type="source" style={{width: '8px', height: '8px'}} position={Position.Bottom} id="a" />
		</>
	);
}