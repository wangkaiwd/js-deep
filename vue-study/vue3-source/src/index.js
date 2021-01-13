// 通过虚拟节点生成真实节点

import { nodeOps } from './runtime-dom';
// re-export:https://javascript.info/import-export#re-export
// 导出文件中的所有具名导出，默认导出需要单独导出
export * from './reactivity';

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
  // name只在子组件里用到了，count在父子组件中都用到了
  effect(() => {
    // subTree是setup中render函数执行后的返回值，即当前组件中的模板对应的虚拟节点
    // render执行后，会从state中进行取值,取值的时候会收集对应的effect
    // 此时只会在子组件进行取值操作，会在取值时将target name effect进行收集，此时effect中传入的fn变为了更新子组件的函数
    // 所以收集到的effect只会更新子组件
    instance.subTree = instance?.render?.();
    // {target:{name: [effect]}}
    patch(null, instance.subTree, container);
  });
}

function patch (n1, n2, container) {
  // 组件的虚拟节点,tag是一个对象
  if (typeof n2.tag === 'string') {
    mountElement(n2, container);
  } else if (typeof n2.tag === 'object') { // 组件
    mountComponent(n2, container);
  }
}


