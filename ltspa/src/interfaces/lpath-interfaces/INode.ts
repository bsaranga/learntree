/* eslint-disable semi */
export type LPNode = 'prerequisite' | 'root' | 'topic' | 'aggregate';

export default interface INode {
    id?: string,
    name?: string,
    nodeType?: LPNode,
    children?: INode[]
}