import { ChevronDown, DoubleChevronDown, ThumbsDown, ThumbsUp } from '../assets/Icons';
import ICardProps from '../interfaces/ICardProps';
import './_debug.scss';

interface ICardPropWrapper {
	data: ICardProps
}

export default function Card(props: ICardPropWrapper) {
	const dProps = {...props.data as ICardProps};
	return(
		<div className='bg-white w-1/2 mx-auto rounded-md flex flex-col divide-y shadow-lg'>
			{/*Header*/}
			<div className='flex justify-between pt-4 pb-2 px-5'>
				<div className='flex'>
					<div className=''>
						<img className='w-9 h-9 rounded-full ring-2 ring-red-400' src={dProps.author.imageUrl} alt={`Image of ${dProps.author.name}`} />
					</div>
					<div className='flex flex-col ml-3 justify-center mt-0.5'>
						<div className='font-semibold text-lg -mt-1 -mb-1'>{dProps.author.name}</div>
						<div className='text-xs font-normal text-gray-600'>{dProps.author.title}</div>
					</div>
				</div>
				<button className='text-xs font-medium text-teal-700 hover:text-teal-500 self-center'>Follow</button>
			</div>
			{/*Body*/}
			<div className='py-2 px-8 flex flex-col'>
				<div>
					<div className='text-lg -mb-1'>{dProps.lPath.title}</div>
					<div className='text-xs'>{dProps.lPath.subtitle}</div>
					<p className='mt-4 text-[0.75rem] mb-4'>{dProps.lPath.description}</p>
					<button className='text-white font-medium text-xxs2 bg-red-400 hover:bg-red-500 px-1 py-0.5 rounded-sm'>Explore</button>
				</div>
			</div>
			{/*Social actions*/}
			<div className='mt-3 py-2 px-4 flex flex-col'>
				<div className='flex justify-between mt-2'>
					<div className='grow mr-2'>
						<form action='none' className='border-2 rounded-sm flex py-1 px-2'>
							<input className='w-full text-xxs2' type="text" name='comment' id='comment' placeholder='Comment'></input>
							<button type='button' className='text-xxs2 font-semibold text-blue-900'>Post</button>
						</form>
						<DoubleChevronDown className='text-gray-300 hover:text-green-400 self-center' scale='h-4 w-4'/>
					</div>
					<div className='flex items-center space-x-2'>
						<div className='flex'>
							<div className='text-xs font-semibold px-0.5 rounded-sm text-green-500'>{dProps.votes.upvotes}</div>
							<ThumbsUp className="text-gray-300 hover:text-green-400 ml-0.5" scale='h-4 w-4'/>
						</div>
						<div className='flex'>
							<div className='text-xs font-semibold px-0.5 rounded-sm text-red-500'>{dProps.votes.downvotes}</div>
							<ThumbsDown className="text-gray-300 hover:text-red-400" scale='h-4 w-4'/>
						</div>
						<button className='text-xs ml-2 bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded-sm'>Subscribe</button>
					</div>
				</div>
			</div>
		</div>
	);
}