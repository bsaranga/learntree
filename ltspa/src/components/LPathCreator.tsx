import G6, { Graph, GraphData, ModelConfig } from '@antv/g6';
import { useLayoutEffect, useRef, useState } from 'react';
import ICoordinate from '../interfaces/common/ICoordinate';
import { randomIdGenerator } from '../utilities/generators';
import './Layout.scss';

export default function LPathCreator() {
	const ref = useRef<HTMLDivElement>(null);

	function getModelConfig(cX: number, cY: number): ModelConfig {
		return {
			x: cX,
			y: cY
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
				graph.addItem('node', getModelConfig(contextPos.x, contextPos.y));
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
		};
	}, []);

	return (
		<div ref={ref} className="w-[100vw] dynamicHeight">
			<div className='p-2 absolute'>
				<div className='text-sm font-medium text-slate-700'>Create Mode</div>
			</div>
		</div>
	);
}