interface IPropIcon {
    className: string,
    scale?: string
}

function Conversation(props: IPropIcon) {
	return (
		<div className={props.className}>
			<svg xmlns="http://www.w3.org/2000/svg" className={props.scale} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<path strokeLinecap="round" strokeWidth={1.6} strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
			</svg>
		</div>
	);
}

function Plus(props: IPropIcon) {
	return (
		<div className={props.className}>
			<svg xmlns="http://www.w3.org/2000/svg" className={props.scale} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
			</svg>
		</div>
	);
}

export { Conversation, Plus };