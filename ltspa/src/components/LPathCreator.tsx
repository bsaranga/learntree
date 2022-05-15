/* eslint-disable @typescript-eslint/no-explicit-any */
import G6, { Graph, GraphData, IShape, ModelConfig } from '@antv/g6';
import { Modal } from 'antd';
import { forwardRef, useLayoutEffect, useRef, LegacyRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ICoordinate from '../interfaces/common/ICoordinate';
import { getLines } from '../utilities/canvasUtils';
import './Layout.scss';

const FloatingInput = forwardRef((props, ref: LegacyRef<HTMLDivElement>) => (
	<div ref={ref} className='bg-white rounded-sm shadow-sm border-2 border-slate-400 absolute w-auto'>
		<input className='focus:outline-none p-1 text-xs w-auto' type="text" />
	</div>
));
FloatingInput.displayName = 'FloatingInput';

export default function LPathCreator() {
	
	const [createModalVisible, setCreateModalVisibility] = useState(true);
	const navigate = useNavigate();

	const ref = useRef<HTMLDivElement>(null);
	const floatingInput = useRef<HTMLDivElement>(null);
	const saveGraph = useRef<HTMLButtonElement>(null);

	function getModelConfig(cX: number, cY: number, nodeLabel: string): ModelConfig {
		return {
			x: cX,
			y: cY,
			label: nodeLabel,
			type: 'customNode'
		};
	}
	const data: GraphData = {
		nodes: [
			{
				id: '1',
				label: 'If this component has been mounted into the DOM, this returns the corresponding native browser DOM element. This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements. In most cases, you can attach a ref to the DOM node and avoid using findDOMNode at all.',
				x: 450,
				y: 250,
				type: 'customNode'
			},
			{
				id: '2',
				label: 'CSS Object Model',
				x: 350,
				y: 150,
				type: 'customNode'
			}
		],
		edges: [
			{source: '1', target: '2'}
		]
	};

	useLayoutEffect(() => {
		const grid = new G6.Grid();
		const floatingInputRef = floatingInput.current;
		const contextPos = {} as ICoordinate;
		const canvasPoint = {} as ICoordinate;
		let nodeLabel: string;

		// #region Init
		setFloatingInputVisibility(false);
		// #endregion

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
		//#endregion

		// #region Context Menu
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
			},
			offsetX: 0,
			offsetY: 0,
			className: 'createContextMenu',
			itemTypes: ['canvas'],
		});
		// #endregion

		// #region Graph Init
		const graph: Graph = new G6.Graph({
			container: ref.current as HTMLDivElement,
			fitView: true,
			fitViewPadding: 50,
			modes: {
				default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'brush-select']
			},
			defaultNode: {
				type: 'customNode'
			},
			defaultEdge: {
				size: 2
			},
			animate: true,
			animateCfg: {
				duration: 450,
				easing: 'easeCubic'
			},
			plugins: [grid, contextMenu]
		});
		// #endregion

		const canvasCtx: CanvasRenderingContext2D = graph.get('canvas').cfg.context;

		//#region Register custom nodes
		G6.registerNode('customNode', {
			drawShape: (cfg, group) => {
				const padding = 10;
				const maxWidth = 200;
				const scalingFactor = 1.2;
				const lines = getLines(cfg?.label?.toString() as string, canvasCtx, maxWidth, scalingFactor);
				const textWidth = canvasCtx.measureText(cfg?.label?.toString() as string).width;

				const rect: IShape = group?.addShape('rect', {
					attrs: {
						cursor: 'pointer',
						fill: 'rgb(240, 246, 255)',
						stroke: 'rgb(59, 126, 241)',
						lineWidth: 1.5,
						radius: 4,
						x: 0,
						y: 0,
						width: textWidth < maxWidth ? textWidth * scalingFactor + padding * 2.4 : 200 + padding * 1.5,
						height: lines.length == 1 ? 24 : 16.5 * lines.length,
					},
				}) as IShape;

				group?.addShape('text', {
					draggable: true,
					attrs: {
						text: lines.join('\n'),
						x: padding,
						y: rect.attr().height / 2,
						textAlign: 'left',
						textBaseline: 'middle',
						fill: '#666',
					},
				}) as IShape;
				return rect as IShape;
			}
		});
		//#endregion

		graph.data(data);
		graph.render();

		// #region Save Graph Button Handlers
		function handleClickOnSaveGraph() {
			console.log('Saved');
		}
		
		saveGraph.current?.addEventListener('click', handleClickOnSaveGraph);
		// #endregion

		// Graph Event Handlers
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

	function navigateHome() {
		navigate('/');
	}

	//#region Modal Popup
	function handleOk() {
		console.log('Created');
		setCreateModalVisibility(false);
	}

	function handleCancel() {
		console.log('Cancelled');
		setCreateModalVisibility(false);
		navigateHome();
	}
	//#endregion Modal Popup

	return (
		<div ref={ref} className="w-[100vw] dynamicHeight">
			<div className='p-2 absolute flex'>
				<div className='text-sm font-medium text-slate-700'>Create Mode</div>
				<button ref={saveGraph} className='ml-2 bg-blue-500 text-sm font-medium text-white px-2 rounded-md'>Save</button>
				<FloatingInput ref={floatingInput} />
			</div>
			<Modal title="Create Learning Path" visible={createModalVisible} onOk={handleOk} onCancel={handleCancel} centered={true} destroyOnClose={true} transitionName='' closable={false}>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea adipisci dicta error quas vitae sunt optio eaque sapiente, ullam, veritatis necessitatibus voluptatem! Minima sit voluptate quam illo repudiandae earum voluptates!</p>
			</Modal>
		</div>
	);
}