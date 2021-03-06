import create from 'zustand';
import RootState from './interfaces/RootState';
import { ActionPayload } from '../utils/StoreUtils';
import { devtools, redux } from 'zustand/middleware';

export const { setLoggedInUser, setIfFirstLoggedIn } = {
	setLoggedInUser: 'SET_LOGGED_IN_USER',
	setIfFirstLoggedIn: 'SET_IF_FIRST_LOGGED_IN'
};

const initialState: RootState = {
	loggedInUser: {
		isFirstLogin: false,
		givenName: '',
		fullName: '',
		imageUrl: ''
	}
};

const reducer = (state: RootState, {type, payload}: ActionPayload): RootState => {
	switch (type) {
	case setLoggedInUser:
		return { loggedInUser: payload };
	case setIfFirstLoggedIn:
		return { loggedInUser: {...state.loggedInUser, isFirstLogin: payload } };
	default:
		return initialState;
	}
};

const useRootStore = create(devtools(redux(reducer, initialState), {name: 'RootStore'}));

export default useRootStore;