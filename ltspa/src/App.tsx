import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout';
import LPathCreator from './components/LPathCreator';
import LPathViewer from './components/LPathViewer';
import MessageHubContext from './contexts/MessageHubContext';
import { NewsFeed } from './pages/NewsFeed';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import { GetHubConnection, StartHub } from './services/MessageHub';

function App() {
	const messageHub = GetHubConnection();
	StartHub(messageHub);
	return (
		<Routes>
			<Route path='/' element={<MessageHubContext.Provider value={messageHub}><Layout/></MessageHubContext.Provider>}>
				<Route index element={<NewsFeed/>}/>
				<Route path='profile' element={<Profile/>} />
				<Route path='lpath/:lPathId' element={<LPathViewer/>}/>
				<Route path='create' element={<LPathCreator/>}/>
				<Route path='*' element={<NotFound/>} />
			</Route>
		</Routes>
	);
}

export default App; 