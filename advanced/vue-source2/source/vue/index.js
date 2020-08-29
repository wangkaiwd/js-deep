import initState from 'vue/observe';
import Watcher from 'vue/observe/watcher';

function Vue (options) {
  this._init(options);
}

Vue.prototype._init = function (options) {
  const vm = this;
  // The instantiation options used for the current Vue instance.
  // This is useful when you want to include custom properties in the options.
  vm.$options = options;
  initState(vm);
  if (vm.$options.el) {
    vm.$mount();
  }
};

function query (el) {
  if (typeof el === 'string') {
    return document.querySelector(el);
  }
  return el;
}

Vue.prototype.$mount = function () {
  const vm = this;
  let { el } = vm.$options;
  // el: 只在new创建实例时生效
  // It can be a CSS selector or an actual HTMLElement
  // After the instance is mounted, the resolved element will be accessible as `vm.$el`
  // vm.$el: the root DOM element that Vue is managing
  el = vm.$el = query(el);

  function updateComponent () {

  }

  new Watcher(vm, updateComponent);
};
export default Vue;
