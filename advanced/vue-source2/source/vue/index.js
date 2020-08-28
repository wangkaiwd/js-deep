import initState from 'vue/observe';

function Vue (options) {
  this._init(options);
}

Vue.prototype._init = function (options) {
  const vm = this;
  // The instantiation options used for the current Vue instance.
  // This is useful when you want to include custom properties in the options.
  vm.$options = options;
  initState(vm);
};
export default Vue;
