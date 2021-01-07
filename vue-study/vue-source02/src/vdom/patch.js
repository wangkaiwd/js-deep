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

function isSameVNode (vNode1, vNode2) {
  return vNode1.tag === vNode2.tag && vNode1.key === vNode2.key;
}

function updateChildren (oldChildren, newChildren, parent) {
  // 分别设置头尾指针进行遍历，遍历
  let oldStartIndex = 0, oldStartVNode = oldChildren[0], oldEndIndex = oldChildren.length - 1,
    oldEndVNode = oldChildren[oldEndIndex];

  let newStartIndex = 0, newStartVNode = newChildren[0], newEndIndex = newChildren.length - 1,
    newEndVNode = newChildren[newEndIndex];

  // 空间换时间
  function makeMapByKey () {
    return oldChildren.reduce((map, child, i) => {
      if (child.key) {
        map[child.key] = i;
      }
      return map;
    }, {});
  }

  const map = makeMapByKey();
  // 有一个孩子遍历完成后就停止循环
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (isSameVNode(oldStartVNode, newStartVNode)) { // 头和头相同
      // 继续比对标签、属性，以及孩子节点
      patch(oldStartVNode, newStartVNode);
      oldStartVNode = oldChildren[++oldStartIndex];
      newStartVNode = newChildren[++newStartIndex];
    } else if (isSameVNode(oldEndVNode, newEndVNode)) { // 尾和尾相同
      patch(oldEndVNode, newEndVNode);
      oldEndVNode = oldChildren[--oldEndIndex];
      newEndVNode = newChildren[--newEndIndex];
    } else if (isSameVNode(oldStartVNode, newEndVNode)) { // 头和尾相同
      // 将头节点移动到尾节点的下一个节点之前
      parent.insertBefore(oldStartVNode.el, oldEndVNode.el.nextSibling);
      patch(oldStartVNode, newEndVNode);
      oldStartVNode = oldChildren[++oldStartIndex];
      newEndVNode = newChildren[--newEndIndex];
    } else if (isSameVNode(oldEndVNode, newStartVNode)) { // 尾和头相同
      // 将尾节点移动到头节点之前
      parent.insertBefore(oldEndVNode.el, oldStartVNode.el);
      patch(oldEndVNode, newStartVNode);
      oldEndVNode = oldChildren[--oldEndIndex];
      newStartVNode = newChildren[++newStartIndex];
    } else { // 乱序比对
      // 要用新节点的头节点在老节点中查找(根据key)，找到之后将该节点移动到老节点的头节点之前。没有找到的话，将新节点创建为真实节点，插入到头节点之前
      // 如果头和头，尾和尾，头和尾，尾和头相同的话，会走之前的逻辑
      // 最后新节点中有剩余元素，全部插入到老节点的尾节点的下一个兄弟元素之前。
      // 删除老节点中头指针到尾指针之间的元素
      const moveIndex = map[newStartVNode.key];
      // 这里必须要做索引的映射，或者将索引放到映射表里。因为最终还是要通过索引来找到对应的元素，将其设置为null
      if (moveIndex != null) { // 在老节点中找到了新节点，将其移动到头节点之前
        const moveVNode = oldChildren[moveIndex];
        parent.insertBefore(moveVNode.el, oldStartVNode.el);
        oldChildren[moveIndex] = null;
      } else { // 没有找到
        parent.insertBefore(createElement(newStartVNode), oldStartVNode.el);
      }
      newStartVNode = newChildren[++newStartIndex];
    }
  }
  // 如果有新节点剩余，将新节点插入到老节点中
  if (newEndIndex >= newStartIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      const child = newChildren[i];
      const refNode = oldChildren[oldEndIndex + 1];
      const refElm = refNode ? refNode.el : null;
      parent.insertBefore(createElement(child), refElm);
    }
  }
  if (oldEndIndex >= oldStartIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      const child = oldChildren[i];
      parent.removeChild(child.el);
    }
  }
}

export function patch (oldVNode, vNode) {
  if (oldVNode.nodeType) { // 首次渲染，会传入要替换的真实dom
    const el = createElement(vNode);
    const parentNode = oldVNode.parentNode;
    parentNode.insertBefore(el, oldVNode.nextSibling);
    parentNode.removeChild(oldVNode);
    return el;
  } else { // 之后需要用老节点来更新新节点
    if (oldVNode.tag !== vNode.tag) { // 标签不等
      oldVNode.el.replaceWith(createElement(vNode));
      return vNode.el;
    }
    if (!oldVNode.tag) { // 老节点和新节点都是文本节点
      oldVNode.el.textContent = vNode.text;
      return oldVNode.el;
    }
    const el = vNode.el = oldVNode.el;
    const oldChildren = oldVNode.children || [];
    const newChildren = vNode.children || [];
    // 老节有孩子，新节点没有孩子
    // 新节点有孩子，老节点没孩子
    if (oldChildren.length > 0 && newChildren.length === 0) {
      el.innerHTML = '';
    }
    if (newChildren.length > 0 && newChildren.length === 0) {
      for (let i = 0; i < newChildren.length; i++) { // 将新节点的所有还在插入到老节点中
        el.appendChild(createElement(newChildren[i]));
      }

    }
    if (oldChildren.length > 0 && newChildren.length > 0) {
      updateChildren(oldChildren, newChildren, el);
    }
    return el;
  }
}
