// 合并属性：
// 1. Vue.mixin -> mergeOptions(Vue.options,mixins)
// 2. new Vue(options) -> vm.$options = mergeOptions(Vue.options,options)
function initGlobalApi (Vue) {
  Vue.options = {};
  Vue.mixin = function (mixins) {
    console.log('mixins', mixins);
  };
}

export default initGlobalApi;

