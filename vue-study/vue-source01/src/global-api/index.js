// 合并属性：
// 1. Vue.mixin -> mergeOptions(Vue.options,mixins)
// 2. new Vue(options) -> vm.$options = mergeOptions(Vue.options,options)
import { mergeOptions } from '../util';

function initGlobalApi (Vue) {
  Vue.options = {};
  Vue.mixin = function (mixins) {
    this.options = mergeOptions(this.options, mixins);
    console.log('options', this.options);
  };
}

export default initGlobalApi;

