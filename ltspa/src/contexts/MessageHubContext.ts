import { createContext } from 'react';
import * as SignalR from '@microsoft/signalr';

const MessageHubContext = createContext({} as SignalR.HubConnection);
export default MessageHubContext;