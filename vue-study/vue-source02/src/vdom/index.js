function vNode (tag, props, key, children, text) {
  return {
    tag,
    props,
    key,
    children,
    text
  };
}

function createVElement (tag, props = {}, ...children) {
  const { key } = props;
  delete props.key;
  return vNode(tag, props, key, children);
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
