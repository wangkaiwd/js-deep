// 通过虚拟节点生成真实节点

import { nodeOps } from './runtime-dom';

export function render (vNode, container) {
  patch(null, vNode, container);
}

function updateProperties (vNode) {

}

function mountChildren (children, container) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    patch(null, child, container);
  }
}

function mountElement (vNode, container) {
  const { tag, props, children } = vNode;
  const el = vNode.el = nodeOps.createElement(tag);
  if (Array.isArray(children)) {
    mountChildren(children, el);
  } else {
    nodeOps.setTextContent(el, children);
  }
  container.appendChild(el);
}

function patch (n1, n2, container) {
  // 组件的虚拟节点,tag是一个对象
  if (typeof n2.tag === 'string') {
    mountElement(n2, container);
  } else if (typeof n2.tag === 'object') { // 组件

  }
}


