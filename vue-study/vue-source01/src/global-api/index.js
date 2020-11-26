// 合并属性：
// 1. Vue.mixin -> mergeOptions(Vue.options,mixins)
// 2. new Vue(options) -> vm.$options = mergeOptions(Vue.options,options)
import { mergeOptions } from '../util';
import initExtend from './extend';

function initGlobalApi (Vue) {
  Vue.options = {};
  Vue.mixin = function (mixins) {
    this.options = mergeOptions(this.options, mixins);
  };

  Vue.options._base = Vue;
  Vue.component = function (id, definition) {
    // 组件名没有的话会默认取id为组件名
    definition.name = definition.name || id;
    definition = this.options._base.extend(definition);
    console.log('definition', definition);
  };
  initExtend(Vue);
}

export default initGlobalApi;

