/* eslint-disable @typescript-eslint/no-explicit-any */
import G6, { Graph, GraphData, IG6GraphEvent, IShape, Item, ModelConfig, ShapeOptions } from '@antv/g6';
import { Modal } from 'antd';
import { forwardRef, useLayoutEffect, useRef, LegacyRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ICoordinate from '../interfaces/common/ICoordinate';
import { getLines } from '../utilities/canvasUtils';
import { randomIdGenerator } from '../utilities/generators';
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

	const canvasContainer = useRef<HTMLDivElement>(null);
	const floatingInput = useRef<HTMLDivElement>(null);
	const saveGraph = useRef<HTMLButtonElement>(null);

	function getModelConfig(cX: number, cY: number, nodeLabel: string): ModelConfig {
		return {
			id: randomIdGenerator(),
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
		const canvasRef = canvasContainer.current;
		const floatingInputRef = floatingInput.current;
		const saveGraphRef = saveGraph.current;
		const contextPos = {} as ICoordinate;
		const canvasPoint = {} as ICoordinate;
		
		let nodeLabel: string;
		let sourceAnchorIdx: any, targetAnchorIdx: any;
		let startNode: string, endNode: string;

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
			container: canvasRef as HTMLDivElement,
			fitView: true,
			fitViewPadding: 50,
			modes: {
				default: ['drag-canvas', 'zoom-canvas', {
					type: 'drag-node',
					shouldBegin: e => {
						if (e.target.get('name') === 'anchor-point') return false;
						return true;
					}
				}, 'brush-select', {
					type: 'create-edge',
					trigger: 'drag',
					shouldBegin: (e: IG6GraphEvent) => {
						startNode = e.item?._cfg?.id as string;
						if (e.target && e.target.get('name') !== 'anchor-point') return false;
						sourceAnchorIdx = e.target.get('anchorPointIdx');
						e.target.set('links', e.target.get('links') + 1); // cache the number of edge connected to this anchor-point circle
						return true;
					},
					shouldEnd: e => {
						endNode = e.item?._cfg?.id as string;
						const edges = graph.getEdges();
						const edgeIdMappings = edges.map(e => `${e.getSource()._cfg?.model?.id}_${e.getTarget()._cfg?.model?.id}`);

						// if more than one edge is added between two nodes, reject.
						if(edgeIdMappings.indexOf(`${startNode}_${endNode}`) > -1) return false;
						if (e.target && e.target.get('name') !== 'anchor-point') return false;
						if (e.target) {
							targetAnchorIdx = e.target.get('anchorPointIdx');
							e.target.set('links', e.target.get('links') + 1);  // cache the number of edge connected to this anchor-point circle
							return true;
						}
						targetAnchorIdx = undefined;
						return true;
					},
				}]
			},
			defaultNode: {
				type: 'customNode'
			},
			defaultEdge: {
				size: 2,
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
			},
			afterDraw(cfg, group) {
				const bbox = group?.getBBox();
				const anchorPoints = ((this as ShapeOptions).getAnchorPoints as () => number[][])();
				anchorPoints.forEach((anchorPos, i) => {
					group?.addShape('circle', {
						attrs: {
							r: 4,
							x: bbox.x + bbox.width * anchorPos[0],
							y: bbox.y + bbox.height * anchorPos[1],
							fill: '#fff',
							stroke: '#5F95FF',
							lineWidth: 2
						},
						name: 'anchor-point', // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
						anchorPointIdx: i, // flag the idx of the anchor-point circle
						links: 0, // cache the number of edges connected to this shape
						visible: false, // invisible by default, shows up when links > 1 or the node is in showAnchors state
						draggable: true // allow to catch the drag events on this shape
					});
				});
			},
			setState(name, value, item) {
				if (name === 'showAnchors') {
					const anchorPoints = item?.getContainer().findAll(ele => ele.get('name') === 'anchor-point');
					anchorPoints?.forEach(point => {
						if (value || point.get('links') > 0) point.show();
						else point.hide();
					});
				}
			},
			getAnchorPoints() {
				return [[0, 0.5], [0.5, 0], [1, 0.5], [0.5, 1]];
			}
		});
		//#endregion

		graph.data(data);
		graph.render();

		// #region Save Graph Button Handlers
		function handleClickOnSaveGraph() {
			const graphData = graph.save();
			console.log(graphData);
		}

		saveGraphRef?.addEventListener('click', handleClickOnSaveGraph);
		// #endregion

		// #region Graph Event Handlers
		function handleResize() {
			graph.changeSize(canvasRef?.clientWidth as number, canvasRef?.clientHeight as number);
		}
		// #endregion

		// #region Node Event Handlers
		graph.on('node:mouseenter', e => {
			graph.setItemState(e.item as Item, 'showAnchors', true);
		});
		graph.on('node:mouseleave', e => {
			graph.setItemState(e.item as Item, 'showAnchors', false);
		});
		graph.on('node:dragenter', e => {
			graph.setItemState(e.item as Item, 'showAnchors', true);
		});
		graph.on('node:dragleave', e => {
			graph.setItemState(e.item as Item, 'showAnchors', false);
		});
		graph.on('node:dragstart', e => {
			graph.setItemState(e.item as Item, 'showAnchors', true);
		});
		graph.on('node:dragend', e => {
			graph.setItemState(e.item as Item, 'showAnchors', false);
		});
		// #endregion

		// #region Edge Event Handlers
		graph.on('aftercreateedge', (e: IG6GraphEvent) => {
			// update the sourceAnchor and targetAnchor for the newly added edge
			graph.updateItem(e.edge as Item, {
				sourceAnchor: sourceAnchorIdx,
				targetAnchor: targetAnchorIdx,
			});
		});

		// after drag from the first node, the edge is created, update the sourceAnchor
		graph.on('afteradditem', e => {
			if (e.item && e.item.getType() === 'edge') {
				graph.updateItem(e.item, {
					sourceAnchor: sourceAnchorIdx,
				});
			}
		});

		// if create-edge is canceled before ending, update the 'links' on the anchor-point circles
		graph.on('afterremoveitem', (e:any) => {
			if (e.item && e.item.source && e.item.target) {
				const sourceNode = graph.findById(e.item.source);
				const targetNode = graph.findById(e.item.target);
				const { sourceAnchor, targetAnchor } = e.item;
				if (sourceNode && !isNaN(sourceAnchor)) {
					const sourceAnchorShape = sourceNode.getContainer().find(ele => (ele.get('name') === 'anchor-point' && ele.get('anchorPointIdx') === sourceAnchor));
					sourceAnchorShape.set('links', sourceAnchorShape.get('links') - 1);
				}
				if (targetNode && !isNaN(targetAnchor)) {
					const targetAnchorShape = targetNode.getContainer().find(ele => (ele.get('name') === 'anchor-point' && ele.get('anchorPointIdx') === targetAnchor));
					targetAnchorShape.set('links', targetAnchorShape.get('links') - 1);
				}
			}
		});
		// #endregion

		// DOM Event Listeners
		window.addEventListener('resize', handleResize);

		return () => {
			graph.destroy();
			window.removeEventListener('resize', handleResize);
			floatingInputRef?.removeEventListener('input', handleFloatingInputChange);
			floatingInputRef?.removeEventListener('keypress', handleFloatingInputEnterPress);
			floatingInputRef?.removeEventListener('keydown', handleFloatingInputKeyDownEvent);
			saveGraphRef?.removeEventListener('click', handleClickOnSaveGraph);
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
		<div ref={canvasContainer} className="w-[100vw] dynamicHeight">
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