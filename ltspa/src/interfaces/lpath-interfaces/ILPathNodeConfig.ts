/* eslint-disable semi */

import { NodeConfig } from '@antv/g6';
import ILearningPathGraph from './ILearningPathGraph';

export default interface ILPathNodeConfig extends NodeConfig {
    data?: ILearningPathGraph
}