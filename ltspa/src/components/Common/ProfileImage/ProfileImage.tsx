import IProfileImage from '../../../interfaces/IProfileImage';

export default function ProfileImage(props: IProfileImage) {
	const data = {...props};
	return(
		<div className={data.className}>
			<img className={'rounded-full'.concat((() => {
				switch (data.size) {
				case 'smaller':
					return ' '.concat('w-6');	
				case 'small':
					return ' '.concat('w-8');
				case 'normal':
					return ' '.concat('w-10');
				case 'large':
					return ' '.concat('w-12');
				}
				return '';
			})())} src={data.imageUrl} />
		</div>
	);
}