import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LPathMetaData {
	lPathCode?: string,
    lPathName?: string,
	lPathSubTitle?: string,
    lPathDescription?: string,
}

interface lPathState {
    activeLPath: LPathMetaData
}

const initialState: lPathState = {
	activeLPath: {}
};

export const lPathSlice = createSlice({
	name: 'LPath',
	initialState,
	reducers: {
		setActiveLPath: (state, action: PayloadAction<LPathMetaData>) => {
			state.activeLPath = action.payload;
		}
	}
});

// Action
export const { setActiveLPath } = lPathSlice.actions;

// Reducer
export default lPathSlice.reducer;