import initState from './state';
import { compileToFunctions } from './compiler';
import { callHook, mountComponent } from './lifecycle';
import { mergeOptions } from './shared/merge-options';

function query (el) {
  if (typeof el === 'string') {
    return document.querySelector(el);
  }
  return el;
}

function initMixin (Vue) {
  Vue.prototype._init = function (options = {}) {
    const vm = this;
    vm.$options = mergeOptions(vm.constructor.options, options);
    callHook(vm, 'beforeCreate');
    initState(vm);
    callHook(vm, 'created');
    const { el } = vm.$options;
    if (el) { // pass el option will execute $mount method to mount dom
      vm.$mount(el);
    }
    // https://vuejs.org/v2/api/#vm-mount
    // if have not el options, vue instance will be in "unmounted" state, without an associated DOM element.
    // vm.$mount can be used to manually start the mounting of an unmounted vue instance

    // if element or selector is not provided, the template will be rendered as an off-document element,
    // and you will have to use native DOM API to insert it into the document yourself.
  };

  Vue.prototype.$mount = function (el) {
    const vm = this;
    vm.$el = el = query(el);
    let { render, template } = vm.$options;
    // 如果render存在直接使用render方法
    if (!render) {
      if (!template && el) {
        template = el.outerHTML;
      }
      vm.$options.render = compileToFunctions(template);
    }
    mountComponent(vm);
  };
}

export default initMixin;
