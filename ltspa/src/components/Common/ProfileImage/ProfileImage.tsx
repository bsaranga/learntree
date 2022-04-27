import IProfileImage from '../../../interfaces/IProfileImage';

export default function ProfileImage(props: IProfileImage) {
	const data = {...props};
	return(
		<div>
			<img className={'rounded-full'.concat((() => {
				const space = ' ';
				switch (data.size) {
				case 'small':
					return space.concat('w-8');
				case 'normal':
					return space.concat('w-12');
				case 'large':
					return space.concat('w-16');
				}
				return '';
			})())} src={data.imageUrl} />
		</div>
	);
}