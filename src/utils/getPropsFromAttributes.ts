import { TagNames, TagProps, TAGS } from '../constants';

export const getPropsFromAttributes = <T extends TagNames>(tagName: T, attr: string[]) => {

  return attr.reduce((acc, curAttribut, i) => {
    const {props} = TAGS[tagName];
    const curProp: TagProps<T> = props[i];
    acc[curProp] = curAttribut;

    return acc;
  }, {} as Record<TagProps<T>, string>);
}
