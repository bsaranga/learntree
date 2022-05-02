import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import G6, { NodeConfig, TreeGraph } from '@antv/g6';
import ILearningPathGraph from '../interfaces/lpath-interfaces/ILearningPathGraph';


export default function LPathViewer() {
	const mindMapData: ILearningPathGraph = {
		'id': 'Modeling Methods',
		nodeType: 'root',
		'children': [
			{
				'id': 'Classification',
				rootType: 'prerequisite',
				'children': [
					{
						'id': 'Logistic regression'
					},
					{
						'id': 'Linear discriminant analysis'
					},
					{
						'id': 'Rules'
					},
					{
						'id': 'Decision trees'
					},
					{
						'id': 'Naive Bayes'
					},
					{
						'id': 'K nearest neighbor'
					},
					{
						'id': 'Probabilistic neural network'
					},
					{
						'id': 'Support vector machine'
					}
				]
			},
			{
				'id': 'Consensus',
				'children': [
					{
						'id': 'Models diversity',
						'children': [
							{
								'id': 'Different initializations'
							},
							{
								'id': 'Different parameter choices'
							},
							{
								'id': 'Different architectures'
							},
							{
								'id': 'Different modeling methods'
							},
							{
								'id': 'Different training sets'
							},
							{
								'id': 'Different feature sets'
							}
						]
					},
					{
						'id': 'Methods',
						'children': [
							{
								'id': 'Classifier selection'
							},
							{
								'id': 'Classifier fusion'
							}
						]
					},
					{
						'id': 'Common',
						'children': [
							{
								'id': 'Bagging'
							},
							{
								'id': 'Boosting'
							},
							{
								'id': 'AdaBoost'
							}
						]
					}
				]
			},
			{
				'id': 'Regression',
				'children': [
					{
						'id': 'Multiple linear regression'
					},
					{
						'id': 'Partial least squares'
					},
					{
						'id': 'Multi-layer feedforward neural network'
					},
					{
						'id': 'General regression neural network'
					},
					{
						'id': 'Support vector regression'
					}
				]
			}
		]
	};

	const params = useParams();

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log('Graph render');
		
		const grid = new G6.Grid();
		const graph: TreeGraph = new G6.TreeGraph({
			container: ref.current as HTMLDivElement,
			fitView: true,
			fitViewPadding: 50,
			modes: {
				default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
			},
			defaultEdge: {
				type: 'cubic-horizontal',
			},
			layout: {
				type: 'mindmap',
				direction: 'H',
				getHeight: () => {
					return 12;
				},
				getWidth: () => {
					return 12;
				},
				getVGap: () => {
					return 8;
				},
				getHGap: () => {
					return 60;
				},
				getSide: (node: NodeConfig) => {
					console.log(node.data);
					if (node.id === 'Classification') {
						return 'left';
					}
					return 'right';
				},
			},
			animate: true,
			animateCfg: {
				duration: 500,
				easing: 'easeCubic'
			},
			plugins: [grid]
		});

		graph.node((node: NodeConfig) => {
			let centerNode = 0;
			if (node?.id === 'Modeling Methods') {
				centerNode = node?.x as number;
			}

			return {
				label: node?.id,
				labelCfg: {
					style: {
						fontWeight: 400,
						fontSize: 12
					},
					position: (!node.children) ? ((node.x as number) > centerNode ? 'right' : 'left') : 'top'
				}
			};
		});

		graph.data(mindMapData);
		graph.render();

		return () => graph.destroy();
	}, []);

	return (
		<div ref={ref} className="w-[100vw] h-[90vh]">
			
		</div>
	);
}