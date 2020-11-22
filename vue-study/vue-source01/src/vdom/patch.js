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

function forEach (obj, cb) {
  if (typeof obj !== 'object' || typeof obj == null) {
    return;
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cb(key, obj[key]);
    }
  }
}

function updateProperties (vNode, oldProps = {}) {
  const { props, el } = vNode;
  for (const key in oldProps) {
    if (oldProps.hasOwnProperty(key) && !vNode.hasOwnProperty(key)) {
      el.removeAttribute(key);
    }
  }
  const { style } = oldProps;
  forEach(style, (key => {
    if (!props.style.hasOwnProperty(key)) {
      // Internet Explore requires setting it to an empty string, and does not do anything when setting it to null
      // IE browser must set empty string, others can set null or empty string to remove some style
      el.style[key] = '';
    }
  }));
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
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  // element node: 1
  // text node: 3
  if (oldVNode.nodeType === 1) {
    // 首次渲染时：将虚拟节点转换为真实节点
    const el = createElement(vNode);
    const parent = oldVNode.parentNode;
    parent.insertBefore(el, oldVNode.nextSibling);
    parent.removeChild(oldVNode);
    return el;
  } else {
    // 1. 之后更新时，会传入老的虚拟节点和新的虚拟节点，老的虚拟节点由于之前渲染而在其el上记录的真实dom
    // 2. 用新的虚拟节点和老的虚拟节点进行对比，然后更新老的虚拟节点上的dom
    // diff比较：同级比较，降低时间复杂度

    // diff比较逻辑：递归三要素：1.终止条件 2.返回值：给上一级返回的信息 3.当前级递归应该做的事情
    // 1. 首先要比较标签，如果标签不一样，直接用新节点替换老节点。
    // 2. 如果标签一样，有可能是文本元素，直接用新节点的文本替换老节点的文本
    // 3. 标签一样，接着比较它们的属性，新节点有的用新节点的，新节点没有的，要从老节点的真实dom中删除
    // 4. 继续对比children,然后重复1~4
    if (oldVNode.tag !== vNode.tag) {
      return oldVNode.el.replaceWith(createElement(vNode));
    }
    if (!oldVNode.tag) { // tag undefined: 文本节点
      if (oldVNode.el.textContent !== vNode.text) {
        oldVNode.el.textContent = vNode.text;
      }
      return;
    }
    // 更新属性
    const el = vNode.el = oldVNode.el;
    updateProperties(vNode, oldVNode.props);
    // 更新孩子节点
    // 更新孩子节点的逻辑：
    //  1. 老节点有孩子，新节点没有孩子，将老节点孩子设置为空
    //  2. 老节点没有孩子，新节点有孩子，将新节点设置为老节点的孩子
    //  3. 老节点和新节点都有孩子，通过双指针进行对比优化：结尾插入、开头插入、倒序、倒叙
    const oldChildren = oldVNode.children;
    const newChildren = vNode.children;
    if (oldChildren.length > 0 && newChildren.length > 0) {
      updateChildren(oldChildren, newChildren, el);
    } else if (oldChildren.length > 0) {
      el.innerHTML = '';
    } else if (newChildren.length > 0) {
      for (let i = 0; i < newChildren.length; i++) {
        const child = newChildren[i];
        el.appendChild(createElement(child));
      }
    }
  }
}

function isSameVNode (oldVNode, newVNode) {
  return (oldVNode.tag === newVNode.tag) && (oldVNode.key === newVNode.key);
}

// Vue中的diff算法做了很多优化(双指针)： 原则：要尽可能的复用
// reverse反转：https://excalidraw.com/#json=5717246110334976,tryA_tqRh4TgnV8KfiQS2w
// 新节点将老节点尾部移动到头部：https://excalidraw.com/#json=5742657385005056,quCfr-Eipq7hHqyvcWdXeQ
// 新节点将老节点头部移动到尾部: https://excalidraw.com/#json=5749951145443328,eP4pUJHAJu2ggUcY6McHEA
function updateChildren (oldChildren, newChildren, parent) {
  let oldStartIndex = 0;
  let oldEndIndex = oldChildren.length - 1;
  let oldStartVNode = oldChildren[oldStartIndex];
  let oldEndVNode = oldChildren[oldEndIndex];
  let newStartIndex = 0;
  let newEndIndex = newChildren.length - 1;
  let newStartVNode = newChildren[newStartIndex];
  let newEndVNode = newChildren[newEndIndex];
  while (newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex) {
    // https://excalidraw.com/#json=6323180297781248,5P1UibC53d7pFiPyG1gadw
    if (isSameVNode(oldStartVNode, newStartVNode)) {
      // 继续执行patch,先比对并更新属性，然后再比对孩子
      patch(oldStartVNode, newStartVNode);
      newStartVNode = newChildren[++newStartIndex];
      oldStartVNode = oldChildren[++oldStartIndex];
    } else if (isSameVNode(oldEndVNode, newEndVNode)) { // https://excalidraw.com/#json=6282157085425664,ShN7flboAy7R-H7f1Bpw3A
      patch(oldEndVNode, newEndVNode);
      newEndVNode = newChildren[--newEndIndex];
      oldEndVNode = oldChildren[--oldEndIndex];
    } else if (isSameVNode(oldStartVNode, newEndVNode)) { // 头和尾比，如果每次都是倒序的话会一直将元素移动到最后一个老节点后面
      patch(oldStartVNode, newEndVNode);
      parent.insertBefore(oldStartVNode.el, oldEndVNode.el.nextSibling);
      oldStartVNode = oldChildren[++oldStartIndex];
      newEndVNode = newChildren[--newEndIndex];
    } else if (isSameVNode(oldEndVNode, newStartVNode)) {
      patch(oldEndVNode, newStartVNode);
      parent.insertBefore(oldEndVNode.el, oldStartVNode.el);
      oldEndVNode = oldChildren[--oldEndIndex];
      newStartVNode = newChildren[++newStartIndex];
    } else { // 暴力对比

    }
  }
  for (let i = newStartIndex; i <= newEndIndex; i++) {
    const child = newChildren[i];
    const referVNode = oldChildren[newEndIndex] ?? null;
    // TODO: referVNode may some  problem ?
    parent.insertBefore(createElement(child), referVNode.el);
  }
}

export default patch;
