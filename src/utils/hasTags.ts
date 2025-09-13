import { TagNames, TAGS } from '../constants';

export const hasTag = (tag: string | null): tag is TagNames =>
  Object.keys(TAGS).includes(tag as string);
