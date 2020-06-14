// 1. 第一次渲染
// 2. 比对操作
// 根据虚拟节点生成要渲染的真实节点
export function render (vnode, container) {
  // console.log(vnode, container);
  // 递归创建
  const el = createElement(vnode);
  container.appendChild(el);
  return el;
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
  // old: { id: 'container', b:'c', style: { backgroundColor: 'yellow' } }
  // new: { id: 'aa', class: 'new-vnode', style: { backgroundColor: 'red' } }
  const { props = {}, el } = vnode;
  for (const key in oldProps.style) {
    if (!props.style[key]) {
      el.style[key] = '';
    }
  }
  // 新的props中没有，旧的props中有，删除该属性
  for (const key in oldProps) {
    if (!props[key]) {
      delete el[key];
    }
  }

  // 用新的props生成dom节点的属性
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

export function patch (oldVnode, newVnode) {
  if (oldVnode.tag !== newVnode.tag) { // 标签不相等，直接用新节点替换旧节点
    // 由于oldVnode在之前执行了render方法，所以它会有el属性，而newVnode是第一次执行，没有el属性
    // 需要通过createElement将virtual node转换为real node
    oldVnode.el.replaceWith(createElement(newVnode));
    return oldVnode.el;
  }
  if (!oldVnode.tag) { // 标签相等且都tag为undefined，即文本节点
    if (oldVnode.text !== newVnode.text) {
      oldVnode.el.textContent = newVnode.text;
    }
    return oldVnode.el;
  }
  // 标签一样，属性不一样
  const el = newVnode.el = oldVnode.el;
  updateProperties(newVnode, oldVnode);

  // 比较孩子节点
  if (oldVnode.children.length > 0 && newVnode.children.length > 0) { // 子节点都存在
    updateChildren(el, oldVnode.children, newVnode.children);
  } else if (oldVnode.children.length > 0) { // 旧节点的子节点存在
    oldVnode.el.innerHTML = '';
  } else if (newVnode.children.length > 0) { // 新节点的子节点存在
    for (let i = 0; i < newVnode.childNodes.length; i++) {
      const newChildEl = createElement(newVnode.childNodes[i]);
      oldVnode.el.appendChild(newChildEl);
    }
  }
  return oldVnode.el;
}

function isSameVNode (oldVNode, newVNode) {
  // 标签和key相同，认为是同一个节点
  return (oldVNode.tag === newVNode.tag) && (oldVNode.key === newVNode.key);
}

// vue增加了很多优化策略 因为在浏览器中操做DOM最常见的方法时：
// 开头或结尾插入
// 涉及到正序和倒叙
function updateChildren (parent, oldChildren, newChildren) {
  let oldStartIndex = 0,
    oldStartVNode = oldChildren[0],
    oldEndIndex = oldChildren.length - 1,
    oldEndVNode = oldChildren[oldEndIndex];
  let newStartIndex = 0, newStartVnode = newChildren[0],
    newEndIndex = newChildren.length - 1,
    newEndVNode = newChildren[newEndIndex];

  // key 和 索引之间可以相互转换
  function makeIndexByKey () {
    const map = {};
    oldChildren.forEach((child, i) => {
      map[child.key] = i;
    });
    return map;
  }

  // {a:0,b:1,...}
  const map = makeIndexByKey();
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartVNode) {
      oldStartVNode = oldChildren[++oldStartIndex];
    } else if (!oldEndVNode) {
      oldEndVNode = oldChildren[--oldEndIndex];
    } else if (isSameVNode(oldStartVNode, newStartVnode)) {
      patch(oldStartVNode, newStartVnode);
      // 开头插入
      // 1. 分别获取新节点和旧节点的开始和结尾索引
      // 2. 从第一项比较节点是否相同，如果相同，继续将新节点和老节点的索引后移再进行比较
      // 3. 老节点开始索引移动到结束索引后，停止循环
      // 4. 将新节点中剩余的节点添加到老节点的末尾
      oldStartVNode = oldChildren[++oldStartIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else if (isSameVNode(oldEndVNode, newEndVNode)) {
      patch(oldEndVNode, newEndVNode);
      // 1. 分别获取新节点和旧节点开始和结尾的索引
      // 2. 从最后一项开始比较，如果节点相同，索引前移
      // 3. 旧节点结尾索引如果等于开始索引，结束循环
      // 4. 将新节点开始位置剩余的内容插入到旧节点开头
      oldEndVNode = oldChildren[--oldEndIndex];
      newEndVNode = newChildren[--newEndIndex];
    } else if (isSameVNode(oldStartVNode, newEndVNode)) {
      patch(oldStartVNode, newEndVNode);
      // 1. 旧节点的头和新节点的头，旧节点的尾和新节点的尾都不相同
      // 2. 旧节点的头和新节点的尾相同，将旧节点的头移动到旧节点的尾节点之后
      // let isSame = false;
      // 3. 重复1，2步骤
      const oldEl = oldStartVNode.el;
      parent.insertBefore(oldEl, oldEndVNode.el.nextSibling);
      oldStartVNode = oldChildren[++oldStartIndex];
      newEndVNode = newChildren[--newEndIndex];
    } else if (isSameVNode(oldEndVNode, newStartVnode)) { // 倒叙：最后一项移动到最前边
      patch(oldEndVNode, newStartVnode);
      parent.insertBefore(oldEndVNode.el, oldStartVNode.el);
      oldEndVNode = oldChildren[--oldEndIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else { // 乱序
      const newEl = createElement(newStartVnode);
      // let moveIndex = 0;
      // for (let i = 0; i < oldChildren.length; i++) {
      //   if (isSameVNode(newStartVnode, oldChildren[i])) {
      //     isSame = true;
      //     moveIndex = i;
      //     break;
      //   }
      // }
      // if (isSame) {
      //   parent.insertBefore(oldChildren[moveIndex].el, oldStartVNode.el);
      // } else {
      //   parent.insertBefore(newEl, oldStartVNode.el);
      // }
      // for (let i = oldStartIndex; i < oldEndIndex; i++) {
      //   parent.removeChild(oldChildren[i].el);
      // }
      // 结尾插入
      // newStartVnode = newChildren[++newStartIndex];
      const moveIndex = map[newStartVnode.key];
      if (moveIndex) {
        const moveNode = oldChildren[moveIndex];
        patch(moveNode, oldStartVNode);
        // 这里真实节点发生了变化，但是虚拟节点并没有变化，还是会继续遍历到该虚拟节点，所以需要置空
        oldChildren[moveIndex] = null;
        parent.insertBefore(moveNode.el, oldStartVNode.el);
      } else {
        parent.insertBefore(newEl, oldStartVNode.el);
      }
      newStartVnode = newChildren[++newStartIndex];
    }
  }
  // 将新节点中剩余节点插入到老节点中
  for (let i = newStartIndex; i <= newEndIndex; i++) {
    const newEl = createElement(newChildren[i]);
    // api不够灵活，这里可以使用insertBefore
    // parent.appendChild(newEl);
    // @see: https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
    // parentNode.insertBefore(newNode, referenceNode)
    // 如何找到参考元素？不好懂的逻辑可以画图
    const refEl = oldChildren[newEndIndex + 1] ? oldChildren[newEndIndex + 1].el : null;
    parent.insertBefore(newEl, refEl);
  }
  // 移动指针并比对完成后，老节点还有剩余节点，需要删除
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      let child = oldChildren[i];
      if (child) {parent.removeChild(child.el);}
    }
  }
}
