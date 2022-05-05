import { useContext, useLayoutEffect, useRef } from 'react';
import G6, { NodeConfig, TreeGraph } from '@antv/g6';
import ILearningPathGraph, { LPNode } from '../interfaces/lpath-interfaces/ILearningPathGraph';
import ILPathNodeConfig from '../interfaces/lpath-interfaces/ILPathNodeConfig';
import { randomIdGenerator } from '../utilities/generators';
import { Button } from 'antd';
import HttpService from '../services/HttpService';
import { APIContext } from '../contexts/APIContext';


export default function LPathViewer() {
	const mindMapData: ILearningPathGraph = {
		id: randomIdGenerator(),
		name: 'Modeling Methods',
		nodeType: 'root',
		children: [
			{
				id: randomIdGenerator(),
				name: 'Prerequisites',
				nodeType: 'prerequisite',
				children: [
					{
						id: randomIdGenerator(),
						name: 'Classification',
						nodeType: 'topic',
						children: [
							{
								id: randomIdGenerator(),
								name: 'Logistic regression',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Linear discriminant analysis',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Rules',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Decision trees',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Naive Bayes',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'K nearest neighbor',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Probabilistic neural network',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Support vector machine',
								nodeType: 'topic',
							}
						]
					},
				]
			},
			{
				id: randomIdGenerator(),
				name: 'Consensus',
				nodeType: 'topic',
				children: [
					{
						id: randomIdGenerator(),
						name: 'Models diversity',
						nodeType: 'topic',
						children: [
							{
								id: randomIdGenerator(),
								name: 'Different initializations',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Different parameter choices',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Different architectures',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Different modeling methods',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Different training sets',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Different feature sets',
								nodeType: 'topic',
							}
						]
					},
					{
						id: randomIdGenerator(),
						name: 'Methods',
						nodeType: 'topic',
						children: [
							{
								id: randomIdGenerator(),
								name: 'Classifier selection',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Classifier fusion',
								nodeType: 'topic',
							}
						]
					},
					{
						id: randomIdGenerator(),
						name: 'Common',
						nodeType: 'topic',
						children: [
							{
								id: randomIdGenerator(),
								name: 'Bagging',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'Boosting',
								nodeType: 'topic',
							},
							{
								id: randomIdGenerator(),
								name: 'AdaBoost',
								nodeType: 'topic',
							}
						]
					}
				]
			},
			{
				id: randomIdGenerator(),
				name: 'Regression',
				nodeType: 'topic',
				children: [
					{
						id: randomIdGenerator(),
						name: 'Multiple linear regression',
						nodeType: 'topic',
					},
					{
						id: randomIdGenerator(),
						name: 'Partial least squares',
						nodeType: 'topic',
					},
					{
						id: randomIdGenerator(),
						name: 'Multi-layer feedforward neural network',
						nodeType: 'topic',
					},
					{
						id: randomIdGenerator(),
						name: 'General regression neural network',
						nodeType: 'topic',
					},
					{
						id: randomIdGenerator(),
						name: 'Support vector regression',
						nodeType: 'topic',
					}
				]
			}
		]
	};

	const httpClient = HttpService.client();
	const api = useContext(APIContext);

	const dataCopy = JSON.parse(JSON.stringify(mindMapData));

	function postData() {
		httpClient.post<ILearningPathGraph>(`${api.protocol}://${api.host}:${api.port}/${api.subRoute}/lpath/create`, dataCopy);
	}

	const rootNode = mindMapData.id;
	const prerequisiteNode = mindMapData.children?.filter(c => c.nodeType === 'prerequisite')[0].id;

	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		console.log('Graph render');

		const grid = new G6.Grid();
		const graph: TreeGraph = new G6.TreeGraph({
			container: ref.current as HTMLDivElement,
			fitView: true,
			fitViewPadding: 50,
			modes: {
				default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'brush-select'],
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
				getSide: (node: ILPathNodeConfig) => {
					if (node.data?.nodeType === 'prerequisite') {
						return 'left';
					}
					return 'right';
				},
			},
			animate: true,
			animateCfg: {
				duration: 450,
				easing: 'easeCubic'
			},
			plugins: [grid]
		});

		graph.node((node: NodeConfig) => {
			let centerNode = 0;

			if (node?.nodeType === 'root') {
				centerNode = node?.x as number;
			}

			return {
				label: node?.name as string,
				labelCfg: {
					style: {
						fontWeight: 400,
						fontSize: 12
					},
					position: (!node.children) ? ((node.x as number) > centerNode ? 'right' : 'left') : 'top'
				}
			};
		});

		graph.edge((edge) => {
			return (edge.source == rootNode && edge.target == prerequisiteNode) ? {
				style: {
					lineDash: [4,2],
					stroke: 'rgb(200,200,200)',
					lineWidth: 1.5
				}
			} : {
				style: {
					stroke: 'rgb(200,200,200)',
					lineWidth: 1.5
				}
			};
		});

		graph.data(mindMapData);
		graph.render();

		return () => graph.destroy();
	}, []);

	return (
		<div ref={ref} className="w-[100vw] h-[90vh]">
			<div className='p-2 absolute'>
				<Button onClick={postData} type='primary' size='small'>Post</Button>
			</div>
		</div>
	);
}