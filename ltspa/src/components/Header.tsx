import { InputGroup, Icon, Button } from '@blueprintjs/core';
import UserService from '../services/UserService';
export function Header () {
	return (
		<div className='sticky py-2.5 px-12 top-0 shadow-lg flex space-x-4 justify-between bg-white'>
			<div className='text-xl font-semibold text-rose-600'>LearnTree<span className='text-xxs align-super'>TM</span></div>
			<InputGroup className='w-2/6' type='search' placeholder='Search...' leftElement={<Icon icon='search'/>}/>
			<div className='flex space-x-2'>
				<Button>Profile</Button>
				<Button outlined={true} onClick={UserService.doLogout}>Log Out</Button>
			</div>
		</div>
	);
}