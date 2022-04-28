import * as SignalR from '@microsoft/signalr';

const HubConnection = new SignalR.HubConnectionBuilder()
	.withUrl('https://localhost:4156/messagehub')
	.build();

export { HubConnection };