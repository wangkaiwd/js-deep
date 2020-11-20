function createElement (vNode) {
  if (vNode.tag) {
    vNode.el = document.createElement(vNode.tag);
    updateProperties(vNode);
    vNode.children.forEach((child) => {
      vNode.el.appendChild(createElement(child));
    });
  } else {
    vNode.el = document.createTextNode(vNode.text);
  }
  return vNode.el;
}

function updateProperties (vNode) {
  const { props, el } = vNode;
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      if (key === 'style') {
        for (const name in props.style) {
          if (props.style.hasOwnProperty(name)) {
            el.style[name] = props.style[name];
          }
        }
      } else {
        el.setAttribute(key, props[key]);
      }
    }
  }
}

function patch (oldVNode, vNode) {
  // 将虚拟节点转换为真实节点
  const el = createElement(vNode);
  const parent = oldVNode.parentNode;
  parent.insertBefore(el, oldVNode.nextSibling);
  parent.removeChild(oldVNode);
  return el;
}

export default patch;
