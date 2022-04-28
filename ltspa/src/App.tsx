import './App.scss';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { HubConnection } from './services/MessageHub';

function App() {
	console.log('App Rendered');

	HubConnection.on('AcceptMessage', (data) => {
		console.log(data);
	});

	HubConnection.start().then(x => console.log(x)).catch(err => console.error(err));

	return (
		<>
			<Header/>
			<Main/>
		</>
	);
}

export default App;