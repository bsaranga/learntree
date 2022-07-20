/* eslint-disable @typescript-eslint/no-explicit-any */

import create from 'zustand';
import { ActionPayload } from '../utils/StoreUtils';
import { devtools, redux } from 'zustand/middleware';
import GraphState, { EventObj } from './interfaces/GraphState';

export const { addMetaData, updateMetaData, addNode, updateNode, deleteNode, addEdge, updateEdge, deleteEdge, setEdgeLabel, flushEventStore } = {
	addMetaData: 'ADD_METADATA',
	updateMetaData: 'UPDATE_METADATA',
	addNode: 'ADD_NODE',
	updateNode: 'UPDATE_NODE',
	deleteNode: 'DELETE_NODE',
	addEdge: 'ADD_EDGE',
	updateEdge: 'UPDATE_EDGE',
	deleteEdge: 'DELETE_EDGE',
	setEdgeLabel: 'SET_EDGE_LABEL',
	flushEventStore: 'FLUSH_EVENT_STORE'
};

const initialState: GraphState = {
	overflow: false,
	eventStore: []
};

const reducer = (state: GraphState, {type, payload}: ActionPayload<EventObj<any>>): GraphState => {
	if (type == flushEventStore) {
		const postedData = ([] as any[]).concat(payload.delta);
		const currentState = ([] as any[]).concat(state.eventStore);
		postedData.forEach(() => currentState.shift());
		return (currentState.length == 0) ? { overflow: false, eventStore: currentState } : { overflow: true, eventStore: currentState };
	}
	payload.type = type;
	return { ...state, eventStore: state.eventStore.concat([payload]) };
};

const useGraphStore = create(devtools(redux(reducer, initialState), {name: 'GraphStore'}));

export default useGraphStore;