import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout';
import { Main } from './components/Main';
import Profile from './pages/Profile';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout/>}>
				<Route index element={<Main/>}/>
				<Route path='profile' element={<Profile/>} />
			</Route>
		</Routes>
	);
}

export default App; 