import ICardProps from '../../../interfaces/ICardProps';
import ICardPropWrapper from '../../../interfaces/ICardPropWrapper';
import ProfileImage from '../../Common/ProfileImage/ProfileImage';

export default function CardHeader(props: ICardPropWrapper) {
	const dProps = {...props.data as ICardProps};
	return (
		<div className='flex justify-between pt-4 pb-2 px-5'>
			<div className='flex'>
				<ProfileImage imageUrl={dProps.author.imageUrl} size="normal" isMentor={false} />
				<div className='flex flex-col ml-3 justify-center mt-0.5'>
					<div className='font-semibold text-lg -mt-1 -mb-1'>{dProps.author.name}</div>
					<div className='text-sm font-normal text-gray-600'>{dProps.author.title}</div>
				</div>
			</div>
			<button className='text-sm font-medium text-teal-700 hover:text-teal-500 self-center'>Follow</button>
		</div>
	);
}