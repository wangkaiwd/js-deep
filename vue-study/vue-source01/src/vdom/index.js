import { isReservedTag } from '../util';

function createVComponent (baseCtor, Ctor, tag, props, key, children, text) {
  if (typeof Ctor === 'object') {
    Ctor = baseCtor.extend(Ctor);
  }
  console.log('Ctor', Ctor);
  props.hook = {
    init () {}
  };
  return vNode(`vue-component-${Ctor.cid}-tag`, props, key, undefined, undefined, { Ctor, children });
}

function createVElement (tag, props = {}, ...children) {
  const { key } = props;
  const vm = this;
  delete props.key;
  // 这里的标签可能是组件标签
  if (isReservedTag(tag)) {
    return vNode(tag, props, key, children, undefined);
  } else { // 创建组件虚拟节点
    const baseCtor = vm.$options._base;
    const Ctor = baseCtor.options.components[tag];
    // 组件虚拟节点的children是插槽
    return createVComponent(baseCtor, Ctor, tag, props, key, children, undefined);
  }
}

function createTextVNode (text) {
  return vNode(undefined, undefined, undefined, undefined, text);
}

export function renderMixin (Vue) {
  Vue.prototype._c = function () {
    return createVElement.call(this, ...arguments);
  };
  Vue.prototype._s = function (val) {
    if (val == null) {
      return '';
    } else if (typeof val === 'object') {
      return JSON.stringify(val);
    } else {
      return val;
    }
  };
  Vue.prototype._v = function (text) {
    return createTextVNode(text);
  };
  Vue.prototype._render = function () {
    const vm = this;
    const { render } = vm.$options;
    return render.call(vm);
  };
}

function vNode (tag, props, key, children, text, componentOptions) {
  return {
    tag,
    props,
    key,
    children,
    text,
    componentOptions // 组件的虚拟节点标签为vue-component-cid-tag形式，并且添加了componentOptions来保存构造函数和插槽
  };
}
