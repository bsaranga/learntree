/* eslint-disable semi */
import { TreeGraphData } from '@antv/g6';

type LPNode = 'root' | 'topic' | 'milestone';
type RootType = 'prerequisite' | 'generic'; 

export default interface ILearningPathGraph extends Omit<TreeGraphData, 'children'> {
    nodeType?: LPNode,
    rootType?: RootType,
    children?: ILearningPathGraph[]
}