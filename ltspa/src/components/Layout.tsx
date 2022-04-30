import { Outlet } from 'react-router-dom';
import MessageHubContext from '../contexts/MessageHubContext';
import { GetHubConnection, StartHub } from '../services/MessageHub';
import { Header } from './Header';

export default function Layout() {
	const messageHub = GetHubConnection();
	StartHub(messageHub);
	return (
		<>
			<Header/>
			<MessageHubContext.Provider value={messageHub}>
				<Outlet/>
			</MessageHubContext.Provider>
		</>
	);
}