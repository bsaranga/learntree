import { Outlet, useLocation } from 'react-router-dom';
import MessageHubContext from '../contexts/MessageHubContext';
import {APIContext, APIContextValue} from '../contexts/APIContext';
import { GetHubConnection, StartHub } from '../services/MessageHub';
import { Header } from './Header';
import './Layout.scss';

export default function Layout() {
	const loc = useLocation();
	const lPathMatch = loc.pathname.split('/').filter(p => p!='').indexOf('lpath') == 0;
	const createPathMatch = loc.pathname.split('/').filter(p => p!='').indexOf('create') == 0;
	const messageHub = GetHubConnection();
	StartHub(messageHub);
	return (
		<>
			<Header/>
			<MessageHubContext.Provider value={messageHub}>
				<APIContext.Provider value={APIContextValue}>
					<div className={(lPathMatch || createPathMatch) ? 'dynamicHeight overflow-y-auto overflow-x-hidden' : 'bg-slate-200 dynamicHeight overflow-y-auto'}>
						<div className='flex justify-center'>
							<Outlet/>
						</div>
					</div>
				</APIContext.Provider>
			</MessageHubContext.Provider>
		</>
	);
}