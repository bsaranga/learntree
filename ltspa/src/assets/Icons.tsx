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

function DoubleChevronDown(props: IPropIcon) {
	return (
		<div className={props.className}>
			<svg xmlns="http://www.w3.org/2000/svg" className={props.scale} viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
			</svg>
		</div>
	);
}

export {ThumbsUp, ThumbsDown, ChevronDown, DoubleChevronDown};