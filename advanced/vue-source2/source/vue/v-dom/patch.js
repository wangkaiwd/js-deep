export const render = (vnode, container) => {
  const el = createElement(vnode);
  container.appendChild(el);
};

const createElement = (vnode) => {
  const { key, tag, props, text, children } = vnode;
  // 标签为字符串：元素
  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag);
    children.forEach(child => {
      render(child, vnode.el);
    });
  } else { // 文本节点
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
};
