// create v-dom
import { vnode } from './create-element';

export function h (tag, props, ...children) {
  const { key, ...restProps } = props;
  children = children.map(child => {
    if (typeof child === 'string') {
      return vnode({ text: child });
    } else { // 调用h生成的virtual node
      return child;
    }
  });
  return vnode({
    tag,
    props: restProps,
    key,
    children
  });
}
