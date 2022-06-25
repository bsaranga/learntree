import { Node } from 'react-flow-renderer';

const initialNodes: Node[] =  [
	{
		id: '1',
		type: 'input',
		data: { label: 'Input Node' },
		position: { x: 250, y: 25 },
	},
  
	{
		id: '2',
		data: { label: <div className='bg-red-200'>Default Node</div> },
		position: { x: 100, y: 125 },
	},
	{
		id: '3',
		type: 'output',
		data: { label: 'Output Node' },
		position: { x: 250, y: 250 },
	},
];

export default initialNodes;