import { vnode } from './create-element';

export function h (tag, props, ...children) {
  const { key, ...restProps } = props;
  // 处理children中的字符串
  children = children.map(child => {
    if (typeof child === 'object') {
      return child;
    } else {
      return vnode(undefined, undefined, undefined, undefined, child);
    }
  });
  return vnode(tag, key, restProps, children);
}
export default h
