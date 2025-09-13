import {TagNames} from '../constants';

export type Message = {
    isQuestion?: boolean;
    text: React.ReactNode;
}

export type NodeContent = string | number;

export type NodeData = {
    name: TagNames | null;
    attr: string[] | null;
    content:  null | (NodeContent)[];
    parent: number | null;
    id: number;
}

export type MMLNodes = Record<number, NodeData>;
