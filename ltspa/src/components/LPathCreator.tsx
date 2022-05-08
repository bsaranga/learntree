/* eslint-disable @typescript-eslint/no-explicit-any */
import G6, { Graph, GraphData, ModelConfig } from '@antv/g6';
import { forwardRef, useLayoutEffect, useRef, LegacyRef } from 'react';
import ICoordinate from '../interfaces/common/ICoordinate';
import { randomIdGenerator } from '../utilities/generators';
import './Layout.scss';

const FloatingInput = forwardRef((props, ref: LegacyRef<HTMLDivElement>) => (
	<div ref={ref} className='bg-white rounded-sm shadow-sm border-2 border-slate-400 absolute'>
		<input className='focus:outline-none p-1 text-xs w-auto' type="text" />
	</div>
));
FloatingInput.displayName = 'FloatingInput';

export default function LPathCreator() {
	const ref = useRef<HTMLDivElement>(null);
	const floatingInput = useRef<HTMLDivElement>(null);

	function getModelConfig(cX: number, cY: number, nodeLabel: string): ModelConfig {
		return {
			x: cX,
			y: cY,
			label: nodeLabel
		};
	}

	const data: GraphData = {
		nodes: [
			{
				id: randomIdGenerator(),
				label: 'Node 1',
				x: 798,
				y: 241
			}
		]
	};

	useLayoutEffect(() => {
		const grid = new G6.Grid();
		const contextPos = {} as ICoordinate;
		let nodeLabel: string;
		setFloatingInputVisibility(false);

		//#region Floating Input
		function setFloatingInputVisibility(value: boolean) {
			if (floatingInput.current != null) {
				floatingInput.current.style.visibility = (value) ? 'visible' : 'hidden';
			}
		}

		function handleFloatingInputChange(ev: any) {
			ev.stopPropagation();
			nodeLabel = ev.target.value;
		}

		function handleFloatingInputEnterPress(ev: KeyboardEvent) {
			ev.stopPropagation();
			if (ev.key == 'Enter') {
				setFloatingInputVisibility(false);
				createNode(nodeLabel);
			}
		}

		function resetFloatingInputValue() {
			nodeLabel = '';
			(floatingInput?.current?.children[0] as HTMLInputElement).value = '';
		}

		function createNode(label: string) {
			if (label) {
				graph.addItem('node', getModelConfig(contextPos.x, contextPos.y, label));
				resetFloatingInputValue();
			}
		}

		function moveFloatingInput(x: number, y: number) {
			if (floatingInput.current != null) {
				floatingInput.current.style.top = `${y}px`;
				floatingInput.current.style.left = `${x}px`;
			}
		}

		function focusFloatingInput() {
			if (floatingInput.current != null) {
				(floatingInput.current.children[0] as HTMLElement).focus();
			}
		}

		floatingInput.current?.addEventListener('input', handleFloatingInputChange);
		floatingInput.current?.addEventListener('keypress', handleFloatingInputEnterPress);
		//#endregion Floating Input

		const contextMenu = new G6.Menu({
			getContent(ev) {
				contextPos.x = ev?.canvasX as number;
				contextPos.y = ev?.canvasY as number;
				return `<div id='root' class='contextMenuItem'>Add Root</div>
						<div id='aggr' class='contextMenuItem'>Add Aggregate</div>
						<div id='topic' class='contextMenuItem'>Add Topic</div>
						<div id='quiz' class='contextMenuItem'>Add Quiz</div>
						`;
			},
			handleMenuClick: (target) => {
				console.log(target.id);
				setFloatingInputVisibility(true);
				moveFloatingInput(contextPos.x, contextPos.y);
				focusFloatingInput();
				console.log(graph.save());
			},
			offsetX: 0,
			offsetY: 0,
			className: 'createContextMenu',
			itemTypes: ['canvas'],
		});

		const graph: Graph = new G6.Graph({
			container: ref.current as HTMLDivElement,
			fitView: true,
			fitViewPadding: 50,
			modes: {
				default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'brush-select']
			},
			defaultNode: {
				size: 50
			},
			animate: true,
			animateCfg: {
				duration: 450,
				easing: 'easeCubic'
			},
			plugins: [grid, contextMenu]
		});

		graph.data(data);
		graph.render();

		// Handlers
		function handleResize() {
			graph.changeSize(ref.current?.clientWidth as number, ref.current?.clientHeight as number);
		}

		// DOM Event Listeners
		window.addEventListener('resize', handleResize);

		return () => {
			graph.destroy();
			window.removeEventListener('resize', handleResize);
			floatingInput.current?.removeEventListener('input', handleFloatingInputChange);
			floatingInput.current?.removeEventListener('keypress', handleFloatingInputEnterPress);
		};
	}, []);

	return (
		<div ref={ref} className="w-[100vw] dynamicHeight">
			<div className='p-2 absolute'>
				<div className='text-sm font-medium text-slate-700'>Create Mode</div>
				<FloatingInput ref={floatingInput}/>
			</div>
		</div>
	);
}