import { Conversation } from '../../../../assets/icons/Icons-Outline';
import { UserCircle } from '../../../../assets/icons/Icons-Solid';
import IGenericProp from '../../../../interfaces/IGenericProp';
import { MultiLineText } from '../../../thirdparty/themed-mui-components/themedMui';

function CommentsEmptyState(props: IGenericProp) {
	return (
		<>
			<Conversation className='text-gray-300 self-center' scale='h-8 w-8'/>
			<div className='text-gray-300 font-semibold self-center'>No comments yet</div>
		</>
	);
}

export default function CommentsSection(props: IGenericProp) {
	return (
		<div className='bg-slate-100 pt-4 mt-2 rounded-md flex flex-col'>
			<CommentsEmptyState/>
			<MultiLineText className='px-2 pb-2'/>
		</div>
	);
}