import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout';
import { NewsFeed } from './pages/NewsFeed';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout/>}>
				<Route index element={<NewsFeed/>}/>
				<Route path='profile' element={<Profile/>} />
				<Route path='*' element={<NotFound/>} />
			</Route>
		</Routes>
	);
}

export default App; 