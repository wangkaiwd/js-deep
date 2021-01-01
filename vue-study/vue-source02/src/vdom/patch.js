function createElement (vNode) {
  if (typeof vNode.tag === 'string') { // here may be custom component tag
    vNode.el = document.createElement(vNode.tag);
    vNode.children.forEach(child => vNode.el.appendChild(createElement(child)));
  } else {
    vNode.el = document.createTextNode(vNode.text);
  }
  return vNode.el;
}

export function patch (oldVNode, vNode) {
  const el = createElement(vNode);
  const parentNode = oldVNode.parentNode;
  parentNode.insertBefore(el, oldVNode.nextSibling);
  parentNode.removeChild(oldVNode);
  return el;
}
