import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';

export default function TopicNode() {
	const [nodeText, setNodeText] = useState<string>('');
	const [nodeInit, setNodeInit] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			inputRef.current?.focus();
		}, 0);

		return () => {
			clearTimeout(timeOut);
		};
	}, []);

	function initialize() {
		setNodeInit(true);
		if (inputRef.current != null)
			inputRef.current.style.display = 'none';
	}

	function unInitialize() {
		if (inputRef.current != null) {
			inputRef.current.innerHTML = nodeText;
			inputRef.current.style.display = 'block';
			inputRef.current.focus();
		}
		setNodeInit(false);
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

	useMemo(() => console.log('Rendered Topic Node'), []);

	return (
		<>
			<div className='bg-white p-2 rounded-md border-2 border-gray-300' onDoubleClick={editHandler}>
				<input ref={inputRef} type="text" onKeyUp={onChange} onBlur={blurHandler} />
				{nodeInit && nodeText}
			</div>
			<Handle type="target" style={{width: '8px', height: '8px'}} position={Position.Top} id="a" />
			<Handle type="source" style={{width: '8px', height: '8px'}} position={Position.Bottom} id="a" />
		</>
	);
}