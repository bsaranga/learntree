import '../../../assets/other-css/spinner.scss';

export default function Spinner() {
	return (
		<div className='absolute z-10 flex items-center justify-center w-full h-full bg-[rgba(0,0,0,0.32)]'>
			<div className='spinner'></div>
		</div>
	);
}