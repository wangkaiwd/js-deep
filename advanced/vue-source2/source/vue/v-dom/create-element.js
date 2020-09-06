export function vnode ({ tag, props, key, children, text }) {
  return {
    tag,
    props,
    key,
    text,
    children,
  };
}
