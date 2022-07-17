import create from 'zustand';
import LPathState from './interfaces/LPathState';
import { ActionPayload } from '../utils/StoreUtils';
import { devtools, redux } from 'zustand/middleware';

export const lPathMetaDataActions = {
	setActiveLPath: 'SET_ACTIVE_LPATH',
};

const initialState: LPathState = {
	activeLPath: {}
};

const reducer = (state: LPathState, {type, payload}: ActionPayload): LPathState => {
	switch (type) {
	case lPathMetaDataActions.setActiveLPath:
		return { activeLPath: payload };
	default:
		return initialState;
	}
};

const useLPathStore = create(devtools(redux(reducer, initialState), {name: 'LPathStore'}));

export default useLPathStore;