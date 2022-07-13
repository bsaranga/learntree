/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Action<T = any> {
    type: T
}

export interface ActionPayload<P = any> extends Action {
    payload: P
}