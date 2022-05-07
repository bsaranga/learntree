import G6, { Graph, GraphData } from '@antv/g6';
import { useLayoutEffect, useRef } from 'react';
import { randomIdGenerator } from '../utilities/generators';
import './Layout.scss';
import './Context.scss';

export default function LPathCreator() {
	const ref = useRef<HTMLDivElement>(null);
	const data: GraphData = {
		nodes: [
			{
				id: randomIdGenerator(),
				label: 'Node 1',
				x: 500,
				y: 500
			}
		]
	};

	useLayoutEffect(() => {
		const grid = new G6.Grid();
		const contextMenu = new G6.Menu({
			getContent(evt) {
				console.log(evt);
				return `<h3>My Context</h3>
                <ul>
                    <li title='1'>li 1</li>
                    <li title='2'>li 2</li>
                    <li>li 3</li>
                    <li>li 4</li>
                    <li>li 5</li>
                </ul>`;
			},
			handleMenuClick: (target, item) => {
				console.log(target, item);
			},
			offsetX: 0,
			offsetY: 0,
			className: 'myContextClass',
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