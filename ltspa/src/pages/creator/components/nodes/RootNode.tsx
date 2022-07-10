import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'react-flow-renderer';
import { message } from 'antd';

export default function RootNode(props: NodeProps) {
	const { addNodes } = useReactFlow();
	const [nodeText, setNodeText] = useState<string>('Untitled');
	const [nodeInit, setNodeInit] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const nodeRef = useCallback((node: HTMLDivElement) => {
		if (node != null && nodeInit == true && inputRef.current != null) {
			inputRef.current.style.width = `${node.clientWidth - 16}px`;
		}
	}, [nodeInit]);

	useEffect(() => {
		let timeOut: NodeJS.Timeout;
		if (nodeInit == false) {
			timeOut = setTimeout(() => {
				inputRef.current?.focus();
			});
		}

		return () => {
			clearTimeout(timeOut);
		};
	}, [nodeInit]);

	const initialize = useCallback(() => {
		setNodeInit(true);
		if (inputRef.current != null) inputRef.current.style.display = 'none';
		addNodes({id: props.id, type: props.type, position: {x: props.xPos, y: props.yPos}, data: {label: nodeText}});
	}, [addNodes, nodeText, props]);

	const unInitialize = useCallback(() => {
		setNodeInit(false);
		if (inputRef.current != null) {
			inputRef.current.innerHTML = nodeText;
			inputRef.current.style.display = 'block';
		}
	}, [nodeText]);

	const onChange = useCallback((event: KeyboardEvent) => {
		if (event.code != 'Enter' && event.code != 'NumpadEnter') {
			setNodeText((event.target as HTMLInputElement).value);
		} else {
			if (nodeText.length > 0) {
				initialize();
			} else {
				message.error({ content: 'Please enter a node label', duration: 2, style: { marginTop: '2rem' } });
			}
		}
	}, [nodeText, initialize]);

	const editHandler = useCallback(() => {
		unInitialize();
	}, [unInitialize]);

	const blurHandler = useCallback(() => {
		if (nodeText.length > 0) {
			initialize();
		} else {
			setNodeText('Untitled');
			initialize();
		}
	}, [nodeText, initialize]);

	useMemo(() => console.log('Rendered Root Node'), []);

	return (
		<>
			<div tabIndex={0} ref={nodeRef} className='bg-white p-2 rounded-md border-2 border-gray-400 shadow-sm focus:outline-none focus:border-blue-400 focus:shadow-md transition-shadow duration-200' onDoubleClick={editHandler}>
				<input ref={inputRef} type="text" onKeyUp={onChange} onBlur={blurHandler} className="h-[18px] focus:outline-none focus:border-b-2 focus:border-b-red-400" />
				{nodeInit && <div>{nodeText}</div>}
			</div>
			<Handle type="source" style={{width: '10px', height: '10px'}} position={Position.Bottom} />
		</>
	);
}