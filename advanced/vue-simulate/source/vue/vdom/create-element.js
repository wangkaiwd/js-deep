// 转换text属性
export function vnode (tag, key, props, children, text) {
  return {
    tag,
    key,
    props,
    children,
    text
  };
}
