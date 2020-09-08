export const render = (vNode, container) => {
  const el = createElement(vNode);
  container.appendChild(el);
};

function isSameVNode (oldVNode, newVNode) {
  return (oldVNode.tag === newVNode.tag) && (oldVNode.key === newVNode.key);
}

/**
 * Vue 针对常见的DOM操作进行了优化
 *  1. 开头插入: https://excalidraw.com/#json=4923045688901632,-Uuzpm-2ECi2BfiYa-nfzQ
 *  2. 结尾插入: https://excalidraw.com/#json=4776455569408000,-OWWGd4HPZ9kgDuSTyVWMw
 *  3. 倒序：https://excalidraw.com/#json=5934571036082176,mC6zQOy1-kvppw7jLM_nZQ
 *  4. 倒叙: https://excalidraw.com/#json=5413565313843200,l71NPnUSYcvaR-07cE_s_Q
 */
function updateChildren (newChildren, oldChildren, parent) {
  let oldStartIndex = 0;
  let oldStartVNode = oldChildren[oldStartIndex];
  let oldEndIndex = oldChildren.length - 1;
  let oldEndVNode = oldChildren[oldEndIndex];
  let newStartIndex = 0;
  let newStartVNode = newChildren[newStartIndex];
  let newEndIndex = newChildren.length - 1;
  let newEndVNode = newChildren[newEndIndex];
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (isSameVNode(oldStartVNode, newStartVNode)) {
      // 如果父节点相同的话继续比较子节点
      patch(oldStartVNode, newStartVNode);
      // 将新老节点的开始索引和节点后移
      oldStartVNode = oldChildren[++oldStartIndex];
      newStartVNode = newChildren[++newStartIndex];
    } else if (isSameVNode(oldEndVNode, newEndVNode)) {
      patch(oldEndVNode, newEndVNode);
      oldEndVNode = oldChildren[--oldEndIndex];
      newEndVNode = newChildren[--newEndIndex];
    } else if (isSameVNode(oldStartVNode, newEndVNode)) {
      patch(oldStartVNode, newEndVNode);
      parent.insertBefore(oldStartVNode.el, oldEndVNode.el.nextSibling);
      newEndVNode = newChildren[--newEndIndex];
      oldStartVNode = oldChildren[++oldStartIndex];
    } else if (isSameVNode(oldEndVNode, newStartVNode)) {
      parent.insertBefore(oldEndVNode.el, oldStartVNode.el);
      patch(oldEndVNode, newStartVNode);
      oldEndVNode = oldChildren[--oldEndIndex];
      newStartVNode = newChildren[++newStartIndex];
    }
  }
  // 将新节点剩余部分直接插入
  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      const refVNode = newChildren[newEndIndex + 1];
      // 这里要使用el属性
      const refEle = refVNode ? refVNode.el : null;
      parent.insertBefore(createElement(newChildren[i]), refEle);
    }
  }
}

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
  // 元素相同，属性不同，需要进行属性替换
  // 将老的el进行保存，方便通过el进行获取，并进行dom操作
  // 而且我们一般会对新节点执行`createElement`方法
  const el = newVNode.el = oldVNode.el;
  updateProperties(newVNode, oldVNode.props);
  const oldChildren = oldVNode.children || [];
  const newChildren = newVNode.children || [];
  // 老的节点有孩子，新节点没有
  // 老节点没有孩子，新节点有孩子
  // 新节点和老节点都有孩子
  if (oldChildren.length > 0 && newChildren.length > 0) {
    updateChildren(newChildren, oldChildren, el);
  } else if (oldChildren.length > 0) {
    el.innerHTML = '';
  } else if (newChildren.length > 0) {
    for (let i = 0; i < newChildren.length; i++) {
      el.appendChild(createElement(newChildren[i]));
    }
  }
};
// 老： {tag: 'div', props: {id: 'container'}, text: 'hello'}
// 新； {tag: 'div', props: {id: 'hh'}, text: 'hh'}
// 1. 如果标签不同的话直接替换老节点
// 2. 如果新节点为文本节点，用新节点文本替换老节点
// 3. 如果标签相同，需要判断更新props以及text
function updateProperties (vNode, oldProps = {}) {
  const { props = {}, el } = vNode;
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


