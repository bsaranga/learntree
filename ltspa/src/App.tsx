import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout';
import LPathCreator from './components/LPathCreator/LPathCreator';
import LPathViewer from './components/LPathViewer';
import MessageHubContext from './contexts/HubContext';
import { NewsFeed } from './pages/NewsFeed';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import { GetHubConnection, StartHub } from './services/HubService';

function App() {
	const hub = GetHubConnection();
	StartHub(hub);
	return (
		<Routes>
			<Route path='/' element={<MessageHubContext.Provider value={hub}><Layout/></MessageHubContext.Provider>}>
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