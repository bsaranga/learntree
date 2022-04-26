import { Conversation } from '../../../../assets/icons/Icons-Outline';
import IGenericProp from '../../../../interfaces/IGenericProp';

function ResponsesEmptyState(props: IGenericProp) {
	return (
		<>
			<Conversation className='text-gray-300 self-center' scale='h-8 w-8'/>
			<div className='text-gray-300 font-semibold self-center'>No responses yet</div>
		</>
	);
}

export default function ResponsesSection(props: IGenericProp) {
	return (
		<div className='bg-slate-100 mt-2 rounded-md flex flex-col'>
			<ResponsesEmptyState/>
		</div>
	);
}