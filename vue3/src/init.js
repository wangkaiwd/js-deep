import initState from './state';

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    this.$options = options;
    const vm = this;
    let { el, template } = this.$options;
    // 扩展不同的初始化功能
    initState(this);
    if (el) { // 没有el选项，会调用$mount方法，进行手动挂载
      // 是否有template,如果有template,将template 转换为render 函数
      // 如果没有，将el.outerHTML作为template
      if (!template) {
        template = el.outerHTML;
      }
      // 开始解析HTML
    }
    // 创建vm.$el来替代el
  };
  Vue.prototype.$mount = function (el) {

  };
}

export {
  initMixin
};
