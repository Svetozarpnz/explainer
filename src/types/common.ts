import {TagNames} from '../constants';

export type Message = {
    isQuestion?: boolean;
    text: string;
}

export type TagData = {
    name: TagNames | null;
    attr: string[] | null;
    content:  null | (TagData | string)[];
    parent: TagData | null;
}