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

function mountComponent (vNode, container) {
  // setup 中返回 render函数
  const component = vNode.tag; // {setup(){ return () => {tag:'div',props:{},'xxx'} }}
  const instance = {
    vNode,
    render: undefined, // setup的返回值
    subTree: undefined, // setup返回的render函数的返回值
  };
  instance.render = component.setup(vNode.props, instance);
  instance.subTree = instance?.render?.();
  // subTree是setup中render函数执行后的返回值，即当前组件中的模板
  patch(null, instance.subTree, container);
}

function patch (n1, n2, container) {
  // 组件的虚拟节点,tag是一个对象
  if (typeof n2.tag === 'string') {
    mountElement(n2, container);
  } else if (typeof n2.tag === 'object') { // 组件
    mountComponent(n2, container);
  }
}

