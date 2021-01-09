import { mergeOptions } from '../shared/merge-options';

export function initExtend (Vue) {
  Vue.extend = function (extendOptions) {
    const Super = this;
    const Sub = function VueComponent (options) {
      // 通过原型链调用Super.prototype上的方法
      this._init(options);
    };
    // 原型链继承
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    // extendOptions: 组件定义
    // Super.options: 全局的一些组件，指令，过滤器等选项
    Sub.options = mergeOptions(Super.options, extendOptions);
    return Sub;
  };
}
