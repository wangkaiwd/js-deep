export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vNode) {
    console.log('vNode', vNode);
  };
}

export function mountComponent (vm, el) {
  // 通过render来生成真实dom
  vm._update(vm._render());
}


