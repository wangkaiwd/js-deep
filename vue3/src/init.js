import initState from './state';

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    this.$options = options;
    // 扩展不同的初始化功能
    initState(this);
  };
}

export {
  initMixin
};
