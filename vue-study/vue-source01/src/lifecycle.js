import patch from './vdom/patch';

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vNode) {
    const vm = this;
    patch(vm.$el, vNode);
  };
}

export function mountComponent (vm, el) {
  // 通过render来生成真实dom
  callHook(vm, 'beforeMount');
  vm._update(vm._render());
  callHook(vm, 'mounted');
}

// call all specify lifecycle hook
export function callHook (vm, hook) {
  const handlers = vm.$options[hook];
  if (Array.isArray(handlers)) {
    for (let i = 0; i < handlers.length; i++) {
      const handler = handlers[i];
      handler.call(vm);
    }
  }
}
