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
        return oldVNode.el.textContent = vNode.text;
      }
    }
    // 更新属性
    const el = vNode.el = oldVNode.el;
    updateProperties(vNode, oldVNode.props);
    // 更新孩子节点
    // 更新孩子节点的逻辑：
    //  1. 老节点有孩子，新节点没有孩子，将老节点孩子设置为空
    //  2. 老节点没有孩子，新节点有孩子，将新节点设置为老节点的孩子
    //  3. 老节点和新节点都有孩子，通过双指针进行对比优化：结尾插入、开头插入、倒序、倒叙
  }
}

function updateChildren () {

}

export default patch;
