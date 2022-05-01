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
				case 'larger': 
					return ' '.concat('w-14');
				case 'large-1xl':
					return ' '.concat('w-20');
				case 'large-2xl':
					return ' '.concat('w-26');
				case 'large-3xl':
					return ' '.concat('w-32');
				}
				return '';
			})())} src={data.imageUrl} />
		</div>
	);
}