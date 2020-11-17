function createVElement (tag, props = {}, ...children) {
  const { key } = props;
  delete props.key;
  return vNode(tag, props, key, children, undefined);
}

function createTextVNode (text) {
  return vNode(undefined, undefined, undefined, undefined, text);
}

export function renderMixin (Vue) {
  Vue.prototype._c = function () {
    return createVElement(...arguments);
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

function vNode (tag, props, key, children, text) {
  return {
    tag,
    props,
    key,
    children,
    text
  };
}
