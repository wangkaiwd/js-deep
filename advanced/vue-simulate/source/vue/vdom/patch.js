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
  // old: { id: 'container', b:'c', style: { backgroundColor: 'yellow' } }
  // new: { id: 'aa', class: 'new-vnode', style: { backgroundColor: 'red' } }
  const { props, el } = vnode;
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
  }
  if (!oldVnode.tag) { // 标签相等且都tag为undefined，即文本节点
    if (oldVnode.text !== newVnode.text) {
      oldVnode.el.textContent = newVnode.text;
    }
  }
  // 标签一样，属性不一样
  const el = newVnode.el = oldVnode.el;
  updateProperties(newVnode, oldVnode);
}
