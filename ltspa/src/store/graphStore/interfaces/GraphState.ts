/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface EventObj<T = any> {
    type?: string,
    delta: T
}

export default interface GraphState {
    overflow?: boolean,
    eventStore: EventObj[]
}