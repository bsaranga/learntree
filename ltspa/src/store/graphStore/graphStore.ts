/* eslint-disable @typescript-eslint/no-explicit-any */

import create from 'zustand';
import GraphState, { EventObj } from './interfaces/GraphState';
import { ActionPayload } from '../utils/StoreUtils';
import { devtools, redux } from 'zustand/middleware';

export const { addMetaData, updateMetaData, addNode, updateNode, deleteNode, addEdge, updateEdge, deleteEdge, setEdgeLabel } = {
	addMetaData: 'ADD_METADATA',
	updateMetaData: 'UPDATE_METADATA',
	addNode: 'ADD_NODE',
	updateNode: 'UPDATE_NODE',
	deleteNode: 'DELETE_NODE',
	addEdge: 'ADD_EDGE',
	updateEdge: 'UPDATE_EDGE',
	deleteEdge: 'DELETE_EDGE',
	setEdgeLabel: 'SET_EDGE_LABEL',
};

const initialState: GraphState = {
	eventStore: []
};

const reducer = (state: GraphState, {type, payload}: ActionPayload<EventObj<any>>): GraphState => {
	payload.type = type;
	return { ...state, eventStore: state.eventStore.concat([payload]) };
};

const useGraphStore = create(devtools(redux(reducer, initialState), {name: 'GraphStore'}));

export default useGraphStore;