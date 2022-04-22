import { Button } from '@blueprintjs/core';
import UserService from '../services/UserService';
import HttpService from '../services/HttpService';

export function Main() {

	const httpClient = HttpService.client();
	
	async function callApi() {
		const result = await httpClient.get('https://localhost:4155/api/LPath/secured');
		console.log(result.data);
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
				<Button onClick={callApi}>Call API</Button>
			</div>
		</div>
	);
}