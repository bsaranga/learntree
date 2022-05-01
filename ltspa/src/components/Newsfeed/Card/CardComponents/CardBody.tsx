import { useNavigate } from 'react-router-dom';
import ICardProps from '../../../../interfaces/ICardProps';
import ICardPropWrapper from '../../../../interfaces/ICardPropWrapper';

export default function CardBody(props: ICardPropWrapper) {
	const navigate = useNavigate();
	const dProps = {...props.data as ICardProps};
	
	function navigateToLPath(lpath: number) {
		navigate(`/lpath/${lpath}`);
	}

	return (
		<div className='py-2 px-8 flex flex-col'>
			<div>
				<div className='text-lg font-medium -mb-1'>{dProps.lPath.title}</div>
				<div className='text-sm text-slate-600'>{dProps.lPath.subtitle}</div>
				<p className='mt-4 text-sm mb-4'>{dProps.lPath.description}</p>
				<button onClick={() => navigateToLPath(dProps.id)} className='text-white font-medium text-xs bg-red-400 hover:bg-red-500 px-1 py-0.5 rounded-sm focus:outline-none active:shadow-md active:translate-y-[1px]'>Explore</button>
			</div>
		</div>
	);
}