import { ThumbsDown, ThumbsUp } from '../assets/Icons';

interface ICardProps {
    authorName?: string,
    authorTitle?: string,
    LPathTitle?: string,
    LPathSubtitle?: string,
    LPathDescription?: string
}

export default function Card(props: ICardProps) {
	return(
		<div className='bg-white w-1/2 mx-auto rounded-md flex flex-col divide-y shadow-lg'>
			<div className='flex justify-between pt-4 pb-2 px-5'>
				<div className='flex mb-1'>
					<div className='bg-green-500 w-8 h-8 rounded-full text-xxs text-center'></div>
					<div className='flex flex-col ml-1.5'>
						<div className='font-semibold'>{props.authorName}</div>
						<div className='text-xxs1 font-normal text-gray-600'>{props.authorTitle}</div>
					</div>
				</div>
				<div className='text-xs font-medium text-teal-700 self-center'>Follow</div>
			</div>
			<div className='py-2 px-8 flex flex-col'>
				<div>
					<div className='text-lg -mb-1'>{props.LPathTitle}</div>
					<div className='text-xs'>{props.LPathSubtitle}</div>
					<p className='mt-4 text-[0.75rem] mb-4'>{props.LPathDescription}</p>
					<div className='text-white font-medium text-xxs2 bg-red-400 w-fit px-1 py-0.5 rounded-sm'>Explore</div>
				</div>
			</div>
			<div className='mt-1.5 py-2 px-3'>
				<div className='flex'>
					<ThumbsUp className="text-gray-300 hover:text-green-400" scale='h-4 w-4'/>
					<ThumbsDown className="text-gray-300 hover:text-red-400" scale='h-4 w-4'/>
				</div>
			</div>
		</div>
	);
}