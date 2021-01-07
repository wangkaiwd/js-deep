// 通过虚拟节点生成真实节点

import { nodeOps } from './runtime-dom';

export function render (vNode, container) {
  patch(null, vNode, container);
}

function updateStyles (el, style) {
  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      el.style[key] = style[key];
    }
  }
}

function updateProperties (vNode) {
  const { props = {}, el } = vNode;
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      if (key === 'style') {
        updateStyles(el, props[key]);
      } else if (/^on[^a-z][a-z]+/.test(key)) { // 处理事件
        const eventName = key.slice(2).toLowerCase();
        el.addEventListener(eventName, props[key]);
      } else {
        el.setAttribute(key, props[key]);
      }
    }
  }
}

// 每次都将对应的父节点传入，而之前是将子节点返回
function mountChildren (children, container) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    patch(null, child, container);
  }
}

function mountElement (vNode, container) {
  const { tag, children } = vNode;
  const el = vNode.el = nodeOps.createElement(tag);
  updateProperties(vNode);
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


