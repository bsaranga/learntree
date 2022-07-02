import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LPathMetaData {
	lPathCode?: string,
    lPathName?: string,
    lPathDescription?: string,
}

interface lPathState {
    activeLPath: LPathMetaData
}

const initialState: lPathState = {
	activeLPath: {
		lPathCode: undefined,
		lPathName: undefined,
		lPathDescription: undefined
	}
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