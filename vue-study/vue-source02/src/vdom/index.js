import { isReservedTag } from '../shared/utils';

function vNode (tag, props, key, children, text) {
  return {
    tag,
    props,
    key,
    children,
    text
  };
}

function createVComponent (vm, tag, props, key, children) {
  // 当前初始化组件的模板中有子组件标签：该组件可能是全局组件，也有可能是局部组件
  // 全局组件：构造函数，局部组件：Object，需要将它们通过Vue.extend统一处理为VueComponent
  const baseCtor = vm.$options._base; // 配置项和并时会进行处理
  let Ctor = vm.$options.components[tag];
  if (typeof Ctor === 'object') {
    Ctor = baseCtor.extend(Ctor); // 在执行Vue.extend时，已经将组件需要的配置项传递好了
  }
  props.hook = {
    init (vNode) {
      const child = vNode.componentInstance = new Ctor();
      // 这里不会传入el，所以需要手动挂载
      child.$mount();
    }
  };
  // 组件的children是slot
  return vNode(`vue-component-${Ctor.id}-${tag}`, props, key, undefined, undefined, { Ctor, children });
}

function createVElement (tag, props = {}, ...children) {
  const vm = this;
  const { key } = props;
  delete props.key;
  if (isReservedTag(tag)) {
    return vNode(tag, props, key, children);
  } else { // 创建组件虚拟节点
    return createVComponent(vm, tag, props, key, children);
  }
}

function stringify (value) {
  if (value == null) {
    return '';
  }
  if (typeof value === 'object') {
    // 会对从vm中取到的值再进行JSON.stringify然后再放到页面中
    return JSON.stringify(value);
  }
  // 简单数据类型直接返回
  return value;
}

function createTextVNode (text) {
  return vNode(undefined, undefined, undefined, undefined, text);
}

export function renderMixin (Vue) {
  Vue.prototype._c = createVElement;
  Vue.prototype._s = stringify;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._render = function () {
    const vm = this;
    const { render } = vm.$options;
    return render.call(vm);
  };
}
