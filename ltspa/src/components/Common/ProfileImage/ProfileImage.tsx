import IProfileImage from '../../../interfaces/IProfileImage';

function sizeMatcherDim(size?: 'smaller' | 'small' | 'normal' | 'large' | 'larger' | 'large-1xl' | 'large-2xl' | 'large-3xl', maintainAspectRatio?: boolean) {
	maintainAspectRatio = (maintainAspectRatio == null) ? false : maintainAspectRatio;
	
	switch (size) {
	case 'smaller':
		return ' '.concat(!maintainAspectRatio ? 'w-6' : 'w-6 h-6');	
	case 'small':
		return ' '.concat(!maintainAspectRatio ? 'w-8' : 'w-8 h-8');
	case 'normal':
		return ' '.concat(!maintainAspectRatio ? 'w-10' : 'w-10 h-10');
	case 'large':
		return ' '.concat(!maintainAspectRatio ? 'w-12' : 'w-12 h-12');
	case 'larger': 
		return ' '.concat(!maintainAspectRatio ? 'w-14' : 'w-14 h-14');
	case 'large-1xl':
		return ' '.concat(!maintainAspectRatio ? 'w-20' : 'w-20 h-20');
	case 'large-2xl':
		return ' '.concat(!maintainAspectRatio ? 'w-26' : 'w-26 h-26');
	case 'large-3xl':
		return ' '.concat(!maintainAspectRatio ? 'w-32' : 'w-32 h-32');
	}

	return '';
}

function fontSizeMatcher(size?: 'smaller' | 'small' | 'normal' | 'large' | 'larger' | 'large-1xl' | 'large-2xl' | 'large-3xl') {
	switch (size) {
	case 'smaller':
		return ' '.concat('text-xs');	
	case 'small':
		return ' '.concat('text-sm');
	case 'normal':
		return ' '.concat('text-base');
	case 'large':
		return ' '.concat('text-lg');
	case 'larger': 
		return ' '.concat('text-xl');
	case 'large-1xl':
		return ' '.concat('text-2xl');
	case 'large-2xl':
		return ' '.concat('text-3xl');
	case 'large-3xl':
		return ' '.concat('text-4xl');
	}
	
	return '';
}

export default function ProfileImage(props: IProfileImage) {
	const data = {...props};
	const initials = data.name?.split(' ').map(w => w[0]).join('');
	return(
		<div className={data.className}>
			{
				!data.imageUrl && 
				<div className={'bg-purple-400 rounded-full flex justify-center items-center w-8 h-8'.concat(sizeMatcherDim(data.size, true))}><span className={'text-white font-bold'.concat(fontSizeMatcher(data.size))}>{initials}</span></div>
			}
			<img className={'rounded-full'.concat(sizeMatcherDim(data.size, false))} src={data.imageUrl} referrerPolicy="no-referrer" />
		</div>
	);
}