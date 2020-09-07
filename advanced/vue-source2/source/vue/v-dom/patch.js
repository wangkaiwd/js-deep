export const render = (vNode, container) => {
  const el = createElement(vNode);
  container.appendChild(el);
};

// 用新节点为旧节点打补丁
export const patch = (oldVNode, newVNode) => {
  if (oldVNode.tag !== newVNode.tag) {
    // 老节点通过render方法调用createElement,为其设置了el属性为真实dom节点
    // 而新节点并没有el属性，需要执行createElement，为其创建相应的真实dom节点
    oldVNode.el.replaceWith(createElement(newVNode));
  }
  if (!newVNode.tag) {
    oldVNode.el.textContent = newVNode.text;
  }
//
};
// 老： {tag: 'div', props: {id: 'container'}, text: 'hello'}
// 新； {tag: 'div', props: {id: 'hh'}, text: 'hh'}
// 1. 如果标签不同的话直接替换老节点
// 2. 如果新节点为文本节点，用新节点文本替换老节点
// 3. 如果标签相同，需要判断更新props以及text
function updateProperties (vNode, oldProps = {}) {
  const { props, el } = vNode;
  const oldStyle = oldProps.style || {};
  const style = props.style || {};
  for (const oldStyleKey in oldStyle) {
    if (oldStyle.hasOwnProperty(oldStyleKey)) {
      if (!style[oldStyle]) {
        // A style declaration is reset by setting it to null or an empty string, e.g., `elt.style.color = null`.
        // Internet Explorer requires setting it to null, and dose not do anything when setting it to null.
        el[oldStyle] = '';
      }
    }
  }
  for (const oldKey in oldProps) {
    if (oldProps.hasOwnProperty(oldKey)) {
      if (!props[oldKey]) {
        delete el[oldKey];
      }
    }
  }
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      const value = props[key];
      if (key === 'style') {
        for (const styleKey in value) {
          if (value.hasOwnProperty(styleKey)) {
            el.style[styleKey] = value[styleKey];
          }
        }
      }
    } else {
      el[key] = value;
    }
  }
}

const createElement = (vNode) => {
  const { key, tag, props, text, children } = vNode;
  // 标签为字符串：元素
  if (typeof tag === 'string') {
    vNode.el = document.createElement(tag);
    updateProperties(vNode);
    children.forEach(child => {
      render(child, vNode.el);
    });
  } else { // 文本节点
    vNode.el = document.createTextNode(text);
  }
  return vNode.el;
};


