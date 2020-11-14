import initState from './state';

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    this.$options = options;
    const vm = this;
    let { el, template } = this.$options;
    // 扩展不同的初始化功能
    initState(this);
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
      console.log('template', template);
    }
    // 有render，就用render方法
  };
}

export {
  initMixin
};
