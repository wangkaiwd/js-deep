// 1. 第一次渲染
// 2. 比对操作
// 根据虚拟节点生成要渲染的真实节点
export function render (vnode, container) {
  // console.log(vnode, container);
  // 递归创建
  const el = createElement(vnode);
  container.appendChild(el);
}

export function createElement (vnode) {
  const { key, tag, props, children, text } = vnode;
  if (typeof tag === 'string') {
    //  标签
    vnode.el = document.createElement(tag);
    updateProperties(vnode);
    children.forEach(child => {
      render(child, vnode.el);
    });
  } else { // 文本
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function updateProperties (vnode, oldProps = {}) {
  const { props, el } = vnode;
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      if (key === 'style') {
        const styles = props[key];
        for (const key in styles) {
          if (styles.hasOwnProperty(key)) {
            el.style[key] = styles[key];
          }
        }
      } else if (key === 'class') {
        // How can I change an element's class with JavaScript?
        // @see: https://stackoverflow.com/questions/195951/how-can-i-change-an-elements-class-with-javascript
        el.className = props[key];
      } else {
        el[key] = props[key];
      }
    }
  }
}
