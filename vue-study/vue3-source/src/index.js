// 通过虚拟节点生成真实节点

import { nodeOps } from './runtime-dom';
// re-export:https://javascript.info/import-export#re-export
// 导出文件中的所有具名导出，默认导出需要单独导出
export * from './reactivity';

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
    // 将子节点插入父节点中
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

function forEach (obj, cb) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cb(obj[key], key);
    }
  }
}

function patchProps (oldProps, props = {}, el) {
  const newStyle = props.style || {};
  const oldStyle = oldProps.style || {};
  forEach(props, (val, key) => {
    if (key !== 'style') {
      el.setAttribute(key, val);
    }
  });
  forEach(oldProps, (val, key) => {
    if (!(key in props)) {
      el.removeAttribute(key);
    }
  });
  forEach(newStyle, (val, key) => {
    el.style[key] = val;
  });
  forEach(oldStyle, (val, key) => {
    if (!(key in newStyle)) {
      // https://developer.mozilla.org/en-US/docs/Web/API/ElementCSSInlineStyle/style#setting_styles
      el.style[key] = '';
    }
  });
}

// 处理老孩子和新孩子都有的情况
function patchKeyedChildren (oldChildren, newChildren, el) {

}

function patchChildren (oldChildren, newChildren, el) {
  if (typeof newChildren === 'string') { // 新的孩子为字符串
    el.textContent = newChildren;
  } else { //
    if (typeof oldChildren === 'string') {
      el.textContent = '';
      mountChildren(newChildren, el);
    } else { // 俩个孩子都拥有子节点
      patchKeyedChildren(oldChildren, newChildren, el);
    }
  }
}

function patchElement (n1, n2, container) {
  const el = n1.el;
  // 比对n1和n2是否相同，这里假设相同
  patchProps(n1.props, n2.props, el);
  // 比对子节点，只考虑都有孩子的情况
  patchChildren(n1.children, n2.children, el);
}

function processElement (n1, n2, container) {
  if (n1 == null) { // 初次渲染老节点为undefined
    mountElement(n2, container);
  } else { // 之后会进行比对更新，n1为老的虚拟节点，n2为新的虚拟节点
    patchElement(n1, n2, container);
  }
}

function patch (n1, n2, container) {
  // 组件的虚拟节点,tag是一个对象(包含组件的选项，如setup,props,components等)
  if (typeof n2.tag === 'string') {
    processElement(n1, n2, container);
  } else if (typeof n2.tag === 'object') { // 组件
    // 组件的diff先不做处理
    mountComponent(n2, container);
  }
}

export function render (vNode, container) {
  patch(container._vNode, vNode, container);
  // 渲染完成后，将老的节点挂载到container上
  container._vNode = vNode;
}
