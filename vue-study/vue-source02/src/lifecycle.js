export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vNode) {
    console.log('vNode', vNode);
  };
}

export function mountComponent (vm) {
  vm._update(vm._render());
}
