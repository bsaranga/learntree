import { InputGroup, Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import ProfileImage from './Common/ProfileImage/ProfileImage';
import { useContext, useEffect } from 'react';
import HubContext from '../contexts/HubContext';
import useRootStore, { setLoggedInUser, setIfFirstLoggedIn } from '../store/rootStore/rootStore';


export function Header () {
	const hub = useContext(HubContext);
	const dispatch = useRootStore(state => state.dispatch);

	useEffect(() => {
		const parsedToken = UserService.getParsedIdToken();
		dispatch({
			type: setLoggedInUser,
			payload: {
				fullName: parsedToken?.name as string,
				givenName: parsedToken?.given_name as string,
				imageUrl: parsedToken?.profile_image as string
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		hub.on('FirstLogin', (isFirstLogin: boolean) => dispatch({type: setIfFirstLoggedIn, payload: isFirstLogin}));
		return () => {
			hub.off('FirstLogin');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loggedInUser = useRootStore(state => state.loggedInUser);
	
	return (
		<div className='sticky py-[0.36rem] px-10 top-0 shadow-lg flex space-x-4 justify-between items-center bg-white'>
			<Link to='/' className='hover:no-underline'>
				<div className='text-2xl font-semibold text-rose-600'>LearnTree<span className='text-xxs align-super'>TM</span></div>
			</Link>
			<InputGroup className='w-2/6' type='search' placeholder='Search...' leftElement={<Icon icon='search'/>}/>
			<div className='flex space-x-2 items-center'>
				<div className='flex items-center border-[2px] rounded-full'>
					<Link to='/profile' className='flex items-center focus:outline-none hover:cursor-pointer hover:bg-blue-50 rounded-l-full hover:no-underline'>
						<ProfileImage name={loggedInUser.fullName} imageUrl={loggedInUser.imageUrl} size="small" isMentor={false}/>
						<div className='font-medium text-base mr-2 ml-2 hover:text-blue-900'>{loggedInUser.givenName}</div>
					</Link>
					<div className='bg-slate-300 w-[2px] h-[1.5rem]'></div>
					<button onClick={UserService.doLogout} className='mr-4 font-medium ml-2 hover:text-red-800 hover:cursor-pointer focus:text-red-800 focus:outline-none'>Logout</button>
				</div>
			</div>
		</div>
	);
}