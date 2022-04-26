import IProfileImage from '../../../interfaces/IProfileImage';

export default function ProfileImage(props: IProfileImage) {
	const data = {...props};
	console.log(data);
	return(
		<div>
			<img className={`rounded-full w-${data.size}`} src={data.imageUrl} />
		</div>
	);
}