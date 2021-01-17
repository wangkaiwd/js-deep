// 通过虚拟节点生成真实节点

import { nodeOps } from './runtime-dom';
// re-export:https://javascript.info/import-export#re-export
// 导出文件中的所有具名导出，默认导出需要单独导出
export * from './reactivity';

// 获得最长递增子序列
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence (arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    // 只处理序列中大于0的元素
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = ((u + v) / 2) | 0;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
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
    // 将子节点插入父节点中
    patch(null, child, container);
  }
}

function mountElement (vNode, container, anchor) {
  const { tag, children } = vNode;
  const el = vNode.el = nodeOps.createElement(tag);
  updateProperties(vNode);
  if (Array.isArray(children)) {
    mountChildren(children, el);
  } else {
    nodeOps.setTextContent(el, children);
  }
  container.insertBefore(el, anchor);
}

function mountComponent (vNode, container, anchor) {
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
    patch(null, instance.subTree, container, anchor);
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

// todo: arrange diff logic , and think actual practice
// 处理老孩子和新孩子都有的情况
function patchKeyedChildren (oldChildren, newChildren, el) { // key的比较
  const oldEndIndex = oldChildren.length - 1, newEndIndex = newChildren.length - 1;

  function makeKeyedToNewIndex () {
    const map = new Map();
    for (let i = 0; i <= newEndIndex; i++) {
      const vNode = newChildren[i];
      if (vNode.props.key) {
        map.set(vNode.props.key, i);
      }
    }
    return map;
  }

  const keyedToNewIndex = makeKeyedToNewIndex();
  // 创建一个存放新孩子节点索引的数组，默认值为-1，没有被复用，如果对某个元素进行了复用，对应的索引设置为老节点中复用元素的索引
  const newIndexToOldIndexMap = [];
  for (let i = 0; i <= newEndIndex; i++) {
    newIndexToOldIndexMap[i] = -1;
  }
  for (let i = 0; i <= oldEndIndex; i++) {
    const vNode = oldChildren[i];
    const { key } = vNode.props;
    const newIndex = keyedToNewIndex.get(key);
    if (newIndex === undefined) {
      // 老节点通过key在新节点中查找，没有找到，将老节点对应的真实节点删除
      el.removeChild(vNode.el);
    } else {// 找到复用
      newIndexToOldIndexMap[newIndex] = i + 1;
      // 继续比对复用元素
      // 在比对孩子之前，会将老节点el赋值给新节点
      patch(vNode, newChildren[newIndex], vNode.el);
    }
  }
  // 得到了最长子序列中每个值在原数组中的索引组成的数组
  // 而它的索引也就是新孩子的索引，说明索引对应的元素的位置不用移动
  const sequence = getSequence(newIndexToOldIndexMap);
  // 移动元素，从后往前插入。此时已经执行了patch方法
  let j = sequence.length - 1;
  for (let i = newEndIndex; i >= 0; i--) {
    const curNode = newChildren[i];
    const refEle = i + 1 <= newEndIndex ? newChildren[i + 1].el : null;
    const oldIndex = newIndexToOldIndexMap[i];
    if (oldIndex === -1) { // 没有复用
      // 将el插入到refEle之前，注意这里会倒着插入，所以参考节点会先被创建出来
      patch(null, curNode, el, refEle);
    } else { // 复用
      // 复用时连续递增的内容不用进行处理
      if (i === sequence[j]) {
        j--;
      } else {
        // 将不连续的内容移动到正确的位置
        el.insertBefore(curNode.el, refEle);
      }
    }
  }
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
  // 当老节点的标签和key相同时，说明是同一个元素，将新节点的el设置为老节点的el
  const el = n2.el = n1.el;
  // 比对n1和n2是否相同，这里假设相同
  patchProps(n1.props, n2.props, el);
  // 比对子节点，只考虑都有孩子的情况
  patchChildren(n1.children, n2.children, el);
}

function processElement (n1, n2, container, anchor) {
  if (n1 == null) { // 初次渲染老节点为undefined
    mountElement(n2, container, anchor);
  } else { // 之后会进行比对更新，n1为老的虚拟节点，n2为新的虚拟节点
    patchElement(n1, n2, container, anchor);
  }
}

function patch (n1, n2, container, anchor = null) {
  // 组件的虚拟节点,tag是一个对象(包含组件的选项，如setup,props,components等)
  if (typeof n2.tag === 'string') {
    processElement(n1, n2, container, anchor);
  } else if (typeof n2.tag === 'object') { // 组件
    // 组件的diff先不做处理
    mountComponent(n2, container, anchor);
  }
}

export function render (vNode, container) {
  patch(container._vNode, vNode, container);
  // 渲染完成后，将老的节点挂载到container上
  container._vNode = vNode;
}
