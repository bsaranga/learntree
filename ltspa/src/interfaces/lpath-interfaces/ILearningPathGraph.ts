/* eslint-disable semi */
import { TreeGraphData } from '@antv/g6';

type LPNode = 'prerequisite' | 'root' | 'topic' | 'milestone'; 

export default interface ILearningPathGraph extends Omit<TreeGraphData, 'children'> {
    nodeType?: LPNode,
    children?: ILearningPathGraph[]
}