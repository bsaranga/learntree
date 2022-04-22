import UserService from '../services/UserService';
export function Main() {
	
	function callApi() {
		fetch('https://localhost:4155/api/LPath/secured',{
			method: 'GET'
		}).then(data => data.json())
			.then(data => console.log(data))
			.catch((err: TypeError) => console.error(err.message));
	}

	return(
		<div className="bg-slate-200 h-screen">
			<div className="px-32">
				<h2 className="text-lg">Auth Info</h2>
				<div>
					<p>Token:</p>
					<div className='break-all'>{UserService.getToken()}</div>
					<div>{UserService.getUsername()}</div>
					<h2 className='text-lg'>Roles</h2>
					<ul>
						{
							UserService.getParsedToken()?.realm_access?.roles.map((role, i) => <li key={`role_${i}`}>{role}</li>)
						}
					</ul>
					<h2 className='text-lg'>Audience</h2>
					<h2>{UserService.getParsedToken()?.aud}</h2>
				</div>
				<button onClick={callApi} className='mt-2 mb-2 bg-zinc-400 px-2 py-1 rounded-sm text-white hover:bg-slate-300 hover:text-purple-800 transition-all duration-75'>Call API</button>
			</div>
		</div>
	);
}