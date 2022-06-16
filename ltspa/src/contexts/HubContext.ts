import { createContext } from 'react';
import * as SignalR from '@microsoft/signalr';

const HubContext = createContext({} as SignalR.HubConnection);
export default HubContext;