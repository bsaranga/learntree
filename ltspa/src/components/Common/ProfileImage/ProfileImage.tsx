import { BadgeCheck } from '../../../assets/icons/Icons-Solid';
import IProfileImage from '../../../interfaces/IProfileImage';

export default function ProfileImage(props: IProfileImage) {
	const data = {...props};
	return(
		<div className='relative'>
			<BadgeCheck className="text-emerald-600 absolute left-7 top-6" scale='h-4 w-4'/>
			<img className={`w-${data.size} h-${data.size} rounded-full`} src={data.imageUrl} />
		</div>
	);
}