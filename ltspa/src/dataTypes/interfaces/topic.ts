import { BaseEntity } from './baseEntity';

export interface Topic extends BaseEntity {
    topicId: number,
    topicName: string
}