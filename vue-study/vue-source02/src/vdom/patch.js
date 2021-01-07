function updateStyles (el, style) {
  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      el.style[key] = style[key];
    }
  }
}

function updateProperties (vNode) {
  const { el, props } = vNode;
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      if (key === 'style') {
        const style = props.style;
        updateStyles(el, style);
      } else {
        el.setAttribute(key, props[key]);
      }
    }
  }
}

function createElement (vNode) {
  if (typeof vNode.tag === 'string') { // here may be custom component tag
    vNode.el = document.createElement(vNode.tag);
    updateProperties(vNode);
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
