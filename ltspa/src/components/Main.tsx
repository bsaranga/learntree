import UserService from '../services/UserService';
export function Main() {
	return(
		<div className="flex flex-row bg-slate-200 h-screen">
			<div className="basis-1/4">1</div>
			<div className="basis-1/2">
				<h2 className="text-lg">Auth Info</h2>
				<div>
					<p>Token:</p>
					<div className='w-5'>{UserService.getToken()}</div>
					<div>{UserService.getUsername()}</div>
				</div>
			</div>
			<div className="basis-1/4">3</div>
		</div>
	);
}