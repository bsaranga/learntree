import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoggedInUser {
    isFirstLogin?: boolean,
    givenName: string,
    fullName: string,
    imageUrl: string
}

interface RootState {
    loggedInUser: LoggedInUser
}

const initialState: RootState = {
	loggedInUser: {
		isFirstLogin: false,
		givenName: '',
		fullName: '',
		imageUrl: ''
	}
};

export const rootSlice = createSlice({
	name: 'Root',
	initialState,
	reducers: {
		setLoggedInUser: (state, action: PayloadAction<LoggedInUser>) => {
			state.loggedInUser = action.payload;
		},
		setIfFirstLogin: (state, action: PayloadAction<boolean>) => {
			state.loggedInUser.isFirstLogin = action.payload;
		}
	}
});

// Action
export const { setLoggedInUser, setIfFirstLogin } = rootSlice.actions;

// Reducer
export default rootSlice.reducer;