import { useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import G6 from '@antv/g6';
import { findDOMNode } from 'react-dom';

const data = {
	// The array of nodes
	nodes: [
		{
			id: 'node1', // String, unique and required
			x: 100, // Number, the x coordinate
			y: 200, // Number, the y coordinate
		},
		{
			id: 'node2', // String, unique and required
			x: 300, // Number, the x coordinate
			y: 200, // Number, the y coordinate
		},
	],
	// The array of edges
	edges: [
		{
			source: 'node1', // String, required, the id of the source node
			target: 'node2', // String, required, the id of the target node
		},
	],
};

export default function LPathViewer() {
	const params = useParams();

	const ref = useRef<HTMLDivElement>(null);
	let graph = null;
	let grid = null;

	useLayoutEffect(() => {
		grid = new G6.Grid({});
		graph = new G6.Graph({
			container: ref.current as HTMLDivElement,
			fitView: true,
			modes: {
				default: ['drag-canvas', 'zoom-canvas'],
			},
			plugins: [grid]
		});

		graph.data(data);
		graph.render();
	}, []);

	return (
		<div ref={ref} className="w-[100vw] h-[95vh]">
			
		</div>
	);
}