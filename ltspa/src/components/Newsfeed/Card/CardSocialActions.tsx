import { useState } from 'react';
import { ChevronDown, ChevronUp, ThumbsDown, ThumbsUp } from '../../../assets/icons/Icons-Solid';
import ICardProps from '../../../interfaces/ICardProps';
import ICardPropWrapper from '../../../interfaces/ICardPropWrapper';
import CommentsSection from './CommentsSection/CommentsSection';

export default function CardSocialActions(props: ICardPropWrapper) {
	const dProps = {...props.data as ICardProps};
	const [commentsDisplay, setCommentsDisplay] = useState<boolean>(false);

	function toggleComments(): void {
		setCommentsDisplay(!commentsDisplay);
	}

	return (
		<div className='mt-3 py-4 px-4 flex flex-col'>
			<div className='flex justify-between'>
				<div className='mr-2'>
					<button onClick={toggleComments} 
						className='text-xs bg-slate-200 px-2 py-0.5 rounded-sm flex items-center hover:bg-slate-300'>
                            Comments
						{
							commentsDisplay ? <ChevronUp className="text-gray-800 ml-1 mt-1" scale='h-4 w-4'/> 
								: <ChevronDown className="text-gray-800 ml-1 mt-1" scale='h-4 w-4'/>
						}
					</button>
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
			{
				commentsDisplay && <CommentsSection/>
			}
		</div>
	);
}