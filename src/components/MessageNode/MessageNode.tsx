import { MMLNodes } from '../../types/common';
import { TAGS } from '../../constants';
import { getPropsFromAttributes } from '../../utils/getPropsFromAttributes';

type Props = {
  mmlNodes: MMLNodes;
  id: number;
}

export const MessageNode = ({ mmlNodes, id }: Props) => {
  const currentNode = mmlNodes[id];
  if (!currentNode) {
    return null
  }
  const { attr, name, content } = currentNode;

  const Component = name ? TAGS[name].component : null;
  const props = name && attr ? getPropsFromAttributes(name, attr) : null;

  const contentRender = () => content?.map((item) => {
    const isItemText = typeof item === 'string';

    return isItemText ? item : <MessageNode mmlNodes={mmlNodes} id={item} />
  });

  return Component && props ? (
    <Component {...props}>
      {contentRender()}
    </Component>
  ) : (
    <div>
      {contentRender()}
    </div>
  )
}
