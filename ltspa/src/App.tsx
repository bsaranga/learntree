import './App.scss';
import { Header } from './components/Header';
import { Main } from './components/Main';
import MessageHubContext from './contexts/MessageHubContext';
import { GetHubConnection, StartHub } from './services/MessageHub';

function App() {

	const messageHub = GetHubConnection();
	StartHub(messageHub);

	return (
		<>
			<MessageHubContext.Provider value={messageHub}>
				<Header/>
				<Main/>
			</MessageHubContext.Provider>
		</>
	);
}

export default App; 