import patch from './vdom/patch';

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vNode) {
    const vm = this;
    patch(vm.$el, vNode);
  };
}

export function mountComponent (vm, el) {
  // 通过render来生成真实dom
  vm._update(vm._render());
}


