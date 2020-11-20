import patch from './vdom/patch';
import Watcher from './observer/watcher';

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vNode) {
    const vm = this;
    vm.$el = patch(vm.$el, vNode);
  };
}

export function mountComponent (vm, el) {
  function updateComponent () {
    vm._update(vm._render());
  }

  // 通过render来生成真实dom
  callHook(vm, 'beforeMount');
  new Watcher(vm, updateComponent, () => {callHook(vm, 'beforeUpdate');}, { render: true });
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
