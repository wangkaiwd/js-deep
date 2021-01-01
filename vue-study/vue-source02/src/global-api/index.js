import { mergeOptions } from '../shared/merge-options';

export function initGlobalApi (Vue) {
  Vue.options = {};
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}
