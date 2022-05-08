/* eslint-disable @typescript-eslint/no-explicit-any */
import G6, { Graph, GraphData, ModelConfig } from '@antv/g6';
import { forwardRef, useLayoutEffect, useRef, LegacyRef } from 'react';
import ICoordinate from '../interfaces/common/ICoordinate';
import { randomIdGenerator } from '../utilities/generators';
import './Layout.scss';

const FloatingInput = forwardRef((props, ref: LegacyRef<HTMLDivElement>) => (
	<div ref={ref} className='bg-white rounded-sm shadow-sm border-2 border-slate-400 absolute w-auto'>
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
		const floatingInputRef = floatingInput.current;
		const contextPos = {} as ICoordinate;
		const canvasPoint = {} as ICoordinate;
		let nodeLabel: string;
		setFloatingInputVisibility(false);

		//#region Graph Updates
		function createNode(label: string) {
			if (label) {
				graph.addItem('node', getModelConfig(canvasPoint.x, canvasPoint.y, label));
				resetFloatingInputValue();
			}
		}
		//#endregion Graph Updates

		//#region Floating Input
		function setFloatingInputVisibility(value: boolean) {
			if (floatingInputRef != null) {
				floatingInputRef.style.visibility = (value) ? 'visible' : 'hidden';
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

		function handleFloatingInputKeyDownEvent(ev: KeyboardEvent) {
			ev.stopPropagation();
			if (ev.key == 'Escape') {
				setFloatingInputVisibility(false);
				resetFloatingInputValue();
			}
		}

		function resetFloatingInputValue() {
			nodeLabel = '';
			(floatingInput?.current?.children[0] as HTMLInputElement).value = '';
		}

		function moveFloatingInput(x: number, y: number) {
			if (floatingInputRef != null) {
				floatingInputRef.style.top = `${y}px`;
				floatingInputRef.style.left = `${x}px`;
			}
		}

		function focusFloatingInput() {
			if (floatingInputRef != null) {
				(floatingInputRef.children[0] as HTMLElement).focus();
			}
		}

		floatingInputRef?.addEventListener('input', handleFloatingInputChange);
		floatingInputRef?.addEventListener('keypress', handleFloatingInputEnterPress);
		floatingInputRef?.addEventListener('keydown', handleFloatingInputKeyDownEvent);
		//#endregion Floating Input

		const contextMenu = new G6.Menu({
			getContent(ev) {
				const gPoint = graph.getPointByCanvas(ev?.canvasX as number, ev?.canvasY as number);
				canvasPoint.x = gPoint.x;
				canvasPoint.y = gPoint.y;
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
			floatingInputRef?.removeEventListener('input', handleFloatingInputChange);
			floatingInputRef?.removeEventListener('keypress', handleFloatingInputEnterPress);
			floatingInputRef?.removeEventListener('keydown', handleFloatingInputKeyDownEvent);
		};
	});

	return (
		<div ref={ref} className="w-[100vw] dynamicHeight">
			<div className='p-2 absolute'>
				<div className='text-sm font-medium text-slate-700'>Create Mode</div>
				<FloatingInput ref={floatingInput}/>
			</div>
		</div>
	);
}