/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface EventObj<T = any> {
    type?: string,
    delta: T
}

export default interface GraphState {
    leftovers?: boolean,
    eventStore: EventObj[]
}