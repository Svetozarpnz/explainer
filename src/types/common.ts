import {TagNames} from '../constants';

export type Message = {
    isQuestion?: boolean;
    text: string;
}

export type NodeData = {
    name: TagNames | null;
    attr: string[] | null;
    content:  null | (NodeData | string)[];
    parent: number | null;
    id: number;
}