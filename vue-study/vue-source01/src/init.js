import initState from './state';
import { compileToFunctions } from './compiler';
import { callHook, mountComponent } from './lifecycle';
import { mergeOptions } from './util';

function initMixin (Vue) {
  Vue.prototype._init = function (options = {}) {
    const vm = this;
    // vm.constructor: 根组件的构造函数是Vue，而子组件的构造函数是通过Vue.extend()生成的Vue的子类
    // 全局组件和局部组件：全局组件在初始化的时候，会将它的选项合并到当前实例的$options上
    this.$options = mergeOptions(vm.constructor.options, options);
    let { el } = this.$options;
    // 扩展不同的初始化功能
    callHook(vm, 'beforeCreate');
    initState(this);
    callHook(vm, 'created');
    if (el) { // 没有el选项，会调用$mount方法，进行手动挂载
      // 挂载el
      vm.$mount(el);
      // if (!template) {
      //   template = el.outerHTML;
      // }
      // 开始解析HTML
    }
    // 创建vm.$el来替代el
  };
  // 根据配置项进行判断，最终拿到要处理的template
  Vue.prototype.$mount = function (el) {
    const vm = this;
    let { render, template } = vm.$options;
    el = vm.$el = document.querySelector(el);
    if (!render) {
      if (!template && el) {
        template = el.outerHTML;
      }
      // 没有render，查看是否有template,如果有template,将template 转换为render 函数
      // 如果没有template，将el.outerHTML作为template

      // 将模板编译为函数，然后将其作为vm.$options.render来方便后续逻辑进行使用
      vm.$options.render = compileToFunctions(template);
    }
    // 有render，就用render方法
    mountComponent(vm, el);
  };
}

export {
  initMixin
};
