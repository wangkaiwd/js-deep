import initState from 'vue/observe';
import Watcher from 'vue/observe/watcher';
import utils from './utils';
import { h, patch, render } from './v-dom';

function Vue (options) {
  this._init(options);
}

Vue.prototype._init = function (options) {
  const vm = this;
  // The instantiation options used for the current Vue instance.
  // This is useful when you want to include custom properties in the options.
  vm.$options = options;
  initState(vm);
  if (vm.$options.el) {
    vm.$mount();
  }
};
Vue.prototype.$watch = function (expr, cb, opts) {
  new Watcher(this, expr, cb, { user: true, ...opts });
};

function query (el) {
  if (typeof el === 'string') {
    return document.querySelector(el);
  }
  return el;
}

function compiler (node, vm) {
  const childNodes = node.childNodes;
  [...childNodes].forEach(child => {
    // 文本节点进行替换
    if (child.nodeType === child.TEXT_NODE) {
      utils.compileText(vm, child);
    }
    // 标签节点继续遍历
    if (child.nodeType === child.ELEMENT_NODE) {
      compiler(child, vm);
    }
  });
}

Vue.prototype._update = function (vNode) {
  const vm = this;
  let { preVNode, $el } = vm;
  if (!preVNode) {
    vm.preVNode = vNode;
    render(vNode, $el);
  } else {
    $el = patch(preVNode, vNode);
  }
};
Vue.prototype._render = function () {
  const vm = this;
  const { render } = vm.$options;
  return render.call(vm, h);
};
Vue.prototype.$mount = function () {
  const vm = this;
  let { el } = vm.$options;
  // el: 只在new创建实例时生效
  // It can be a CSS selector or an actual HTMLElement
  // After the instance is mounted, the resolved element will be accessible as `vm.$el`
  // vm.$el: the root DOM element that Vue is managing
  el = vm.$el = query(el);

  function updateComponent () {
    vm._update(vm._render());
  }

  new Watcher(vm, updateComponent);
};
export default Vue;
