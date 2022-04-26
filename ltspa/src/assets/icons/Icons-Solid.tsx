interface IPropIcon {
    className: string,
    scale?: string
}

function ThumbsUp(props: IPropIcon) {
	return (
		<div className={props.className}>
			<svg xmlns="http://www.w3.org/2000/svg" className={props.scale} viewBox="0 0 20 20" fill="currentColor">
				<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
			</svg>
		</div>
	);
}

function ThumbsDown(props: IPropIcon) {
	return (
		<div className={props.className}>
			<svg xmlns="http://www.w3.org/2000/svg" className={props.scale} viewBox="0 0 20 20" fill="currentColor">
				<path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
			</svg>
		</div>
	);
}

function ChevronDown(props: IPropIcon) {
	return (
		<div className={props.className}>
			<svg xmlns="http://www.w3.org/2000/svg" className={props.scale} viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
			</svg>
		</div>
	);
}

function ChevronUp(props: IPropIcon) {
	return (
		<div className={props.className}>
			<svg xmlns="http://www.w3.org/2000/svg" className={props.scale} viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
			</svg>
		</div>
	);
}

function DoubleChevronDown(props: IPropIcon) {
	return (
		<div className={props.className}>
			<svg xmlns="http://www.w3.org/2000/svg" className={props.scale} viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
			</svg>
		</div>
	);
}

function UserCircle(props: IPropIcon) {
	return (
		<div className={props.className}>
			<svg xmlns="http://www.w3.org/2000/svg" className={props.scale} viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
			</svg>
		</div>
	);
}

function BadgeCheck(props: IPropIcon) {
	return (
		<div className={props.className}>
			<svg xmlns="http://www.w3.org/2000/svg" className={props.scale} viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
			</svg>
		</div>
	);
}

export {ThumbsUp, ThumbsDown, ChevronUp, ChevronDown, DoubleChevronDown, UserCircle, BadgeCheck};