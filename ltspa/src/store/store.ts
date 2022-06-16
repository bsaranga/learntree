import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/rootSlice';

const store = configureStore({
	reducer: {
		root: rootReducer
	}
});

export default store;

// Infer selector and dispatch types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch