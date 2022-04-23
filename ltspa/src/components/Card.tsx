import { ThumbsDown, ThumbsUp } from '../assets/Icons';
import ICardProps from '../interfaces/ICardProps';
import './_debug.scss';

interface ICardPropWrapper {
	data: ICardProps
}

export default function Card(props: ICardPropWrapper) {
	const dProps = {...props.data as ICardProps};
	return(
		<div className='bg-white w-1/2 mx-auto rounded-md flex flex-col divide-y shadow-lg'>
			<div className='flex justify-between pt-4 pb-2 px-5'>
				<div className='flex'>
					<div className=''>
						<img className='w-9 h-9 rounded-full ring-2 ring-red-400' src={dProps.author.imageUrl} alt={`Image of ${dProps.author.name}`} />
					</div>
					<div className='flex flex-col ml-2 justify-center mt-0.5'>
						<div className='font-semibold text-lg -mt-1 -mb-1'>{dProps.author.name}</div>
						<div className='text-xs font-normal text-gray-600'>{dProps.author.title}</div>
					</div>
				</div>
				<div className='text-xs font-medium text-teal-700 self-center'>Follow</div>
			</div>
			<div className='py-2 px-8 flex flex-col'>
				<div>
					<div className='text-lg -mb-1'>{dProps.lPath.title}</div>
					<div className='text-xs'>{dProps.lPath.subtitle}</div>
					<p className='mt-4 text-[0.75rem] mb-4'>{dProps.lPath.description}</p>
					<div className='text-white font-medium text-xxs2 bg-red-400 w-fit px-1 py-0.5 rounded-sm'>Explore</div>
				</div>
			</div>
			<div className='mt-1.5 py-2 px-3'>
				<div className='flex'>
					<div className='flex'>
						<div className='text-xs font-semibold bg-emerald-500'>3</div>
						<ThumbsUp className="text-gray-300 hover:text-green-400" scale='h-4 w-4'/>
					</div>
					<ThumbsDown className="text-gray-300 hover:text-red-400" scale='h-4 w-4'/>
				</div>
			</div>
		</div>
	);
}