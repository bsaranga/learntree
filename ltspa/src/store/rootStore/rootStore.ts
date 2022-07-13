import create from 'zustand';
import { devtools, redux } from 'zustand/middleware';
import RootState from './interfaces/RootState';
import { ActionPayload } from '../utils/StoreUtils';

export const rootActions = {
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
	case rootActions.setLoggedInUser:
		return { loggedInUser: payload };
	case rootActions.setIfFirstLoggedIn:
		return { loggedInUser: {...state.loggedInUser, isFirstLogin: payload } };
	default:
		return initialState;
	}
};

const useStore = create(devtools(redux(reducer, initialState)));

export default useStore;