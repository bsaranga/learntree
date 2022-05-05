import { createContext } from 'react';

interface IAPIContext {
    protocol: string,
	host: string,
	port: string,
	subRoute: string,
}

const APIContextValue = {
	protocol: 'https',
	host: 'localhost',
	port: '4155',
	subRoute: 'api',

};

const APIContext = createContext({} as IAPIContext);

export {APIContext, APIContextValue};