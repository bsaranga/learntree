import ICardProps from '../../../interfaces/ICardProps';
import ICardPropWrapper from '../../../interfaces/ICardPropWrapper';
import CardBody from './CardComponents/CardBody';
import CardHeader from './CardComponents/CardHeader';
import CardSocialActions from './CardComponents/CardSocialActions';

export default function Card(props: ICardPropWrapper) {
	const dProps = {...props.data as ICardProps};
	return(
		<div className='bg-white w-[50rem] rounded-md flex flex-col divide-y shadow-lg'>
			<CardHeader data={dProps} />
			<CardBody data={dProps} />
			<CardSocialActions data={dProps} />
		</div>
	);
}