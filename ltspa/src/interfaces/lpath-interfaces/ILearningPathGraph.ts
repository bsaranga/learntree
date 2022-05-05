/* eslint-disable semi */
export type LPNode = 'prerequisite' | 'root' | 'topic' | 'milestone';

export default interface ILearningPathGraph {
    id?: string,
    name?: string,
    nodeType?: LPNode,
    children?: ILearningPathGraph[]
}