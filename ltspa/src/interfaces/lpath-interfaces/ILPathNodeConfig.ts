/* eslint-disable semi */

import { NodeConfig } from '@antv/g6';
import INode from './INode';

export default interface ILPathNodeConfig extends NodeConfig {
    data?: INode
}