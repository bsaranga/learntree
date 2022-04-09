import { Button, Card, H5 } from '@blueprintjs/core';
import './App.scss';

function App() {

	return (
		<>
			<div className='p-5 shadow-md'>Hello</div>
			<Card className='max-w-md'>
				<H5>
					<a href='#'>Analytical applications</a>
				</H5>
				<p>
				User interfaces that enable people to interact smoothly with data, ask better questions, and
				make better decisions.
				</p>
				<Button text='Explore products' />
			</Card>
		</>
	);
}

export default App;