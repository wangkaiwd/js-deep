import { mergeOptions } from '../shared/merge-options';
import { initExtend } from './extend';

export function initGlobalApi (Vue) {
  Vue.options = {};
  Vue.options._base = Vue;
  Vue.options.components = {};
  initExtend(Vue);
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
  Vue.component = function (id, definition) {
    const name = definition.name || id;
    definition = this.options._base.extend(definition);
    // 将选项放到全局组件中，之后会与局部组件进行合并
    this.options.components[name] = definition;
  };
}
