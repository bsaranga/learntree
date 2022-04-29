import * as SignalR from '@microsoft/signalr';

function GetHubConnection() {
	console.log('GetHubConnection called');
	return new SignalR.HubConnectionBuilder()
		.withUrl('https://localhost:4156/messagehub')
		.withAutomaticReconnect()
		.build();
}

async function StartHub(HubConnection: SignalR.HubConnection) {
	if (!HubConnection.connectionId) {
		console.log('StartHub called');
		await HubConnection.start()
			.then(x => console.log(`%c${x == undefined ? 'Connected to MessageHub' : x }`, 'color:blue'))
			.catch(err => console.error(err));
	}
}

export { GetHubConnection, StartHub };