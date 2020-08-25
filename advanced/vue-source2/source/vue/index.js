import { initState } from 'vue/observe';

function Vue (options) {
  this._init(options);
}

Vue.prototype._init = function (options) {
  const vm = this; // 为this定义一个语义化的名字
  // vm.$options: The instantiation options used for current Vue instance.
  // This is useful when you want to include custom properties in the options
  vm.$options = options;
  initState(vm);
};

export default Vue;
