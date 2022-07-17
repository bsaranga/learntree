import UserService from '../services/UserService';
import ProfileImage from '../components/Common/ProfileImage/ProfileImage';

export default function Profile() {
	const parsedIdToken = UserService.getParsedIdToken();
	return (
		<div className="bg-white w-[60rem] rounded-md flex flex-col shadow-lg mt-4">
			<div className="flex p-6 space-x-4">
				<ProfileImage name={parsedIdToken?.name} imageUrl={parsedIdToken?.profile_image} size='large-1xl' />
				<div>
					<div className='text-3xl font-medium'>{parsedIdToken?.name}</div>
					<div>Interest cloud</div>
				</div>
			</div>
		</div>
	);
}