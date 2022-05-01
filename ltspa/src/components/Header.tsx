import { InputGroup, Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import ProfileImage from './Common/ProfileImage/ProfileImage';


export function Header () {

	const parsedToken = UserService.getParsedIdToken();
	
	return (
		<div className='sticky py-[0.36rem] px-10 top-0 shadow-lg flex space-x-4 justify-between items-center bg-white'>
			<Link to='/' className='hover:no-underline'>
				<div className='text-2xl font-semibold text-rose-600'>LearnTree<span className='text-xxs align-super'>TM</span></div>
			</Link>
			<InputGroup className='w-2/6' type='search' placeholder='Search...' leftElement={<Icon icon='search'/>}/>
			<div className='flex space-x-2 items-center'>
				<div className='flex items-center border-[2px] rounded-full'>
					<Link to='/profile' className='flex items-center focus:outline-none hover:cursor-pointer hover:bg-blue-50 rounded-l-full hover:no-underline'>
						<ProfileImage imageUrl={parsedToken?.profile_image} size="small" isMentor={false}/>
						<div className='font-medium text-base mr-2 ml-2 hover:text-blue-900'>{parsedToken?.given_name}</div>
					</Link>
					<div className='bg-slate-300 w-[2px] h-[1.5rem]'></div>
					<button onClick={UserService.doLogout} className='mr-4 font-medium ml-2 hover:text-red-800 hover:cursor-pointer focus:text-red-800 focus:outline-none'>Logout</button>
				</div>
			</div>
		</div>
	);
}