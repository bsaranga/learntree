import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';

export default function RootNode() {
	const [nodeText, setNodeText] = useState<string>('Untitled Root Node');
	const [nodeInit, setNodeInit] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		let timeOut: NodeJS.Timeout;
		
		if (nodeInit == false) {
			timeOut = setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		}

		return () => {
			clearTimeout(timeOut);
		};
	}, [nodeInit]);

	function initialize() {
		setNodeInit(true);
		if (inputRef.current != null)
			inputRef.current.style.display = 'none';
	}

	function unInitialize() {
		setNodeInit(false);
		if (inputRef.current != null) {
			inputRef.current.innerHTML = nodeText;
			inputRef.current.style.display = 'block';
		}
	}

	const onChange = useCallback((event: KeyboardEvent) => {
		if (event.code != 'Enter' && event.code != 'NumpadEnter') {
			setNodeText((event.target as HTMLInputElement).value);
		} else {
			initialize();
		}
	}, []);

	const editHandler = useCallback(() => {
		unInitialize();
	}, []);

	const blurHandler = useCallback(() => {
		initialize();
	}, []);

	useMemo(() => console.log('Rendered Root Node'), []);

	return (
		<>
			<div className='bg-white p-2 rounded-md border-2 border-gray-300' onDoubleClick={editHandler}>
				<input ref={inputRef} type="text" onKeyUp={onChange} onBlur={blurHandler} />
				{nodeInit && nodeText}
			</div>
			<Handle type="source" style={{width: '8px', height: '8px'}} position={Position.Bottom} id="a" />
		</>
	);
}