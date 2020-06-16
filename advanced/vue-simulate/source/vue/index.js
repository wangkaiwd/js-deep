import { initState } from './observe';
import Watcher from './observe/watcher';
import { compilerText } from './utils';
import { h, patch, render } from './vdom';

function Vue (options) {
  this._init(options);
}

function query (el) {
  // el: '#app'，通过querySelector选取dom元素
  if (typeof el === 'string') {
    return document.querySelector(el);
  }
  // el: document.querySelector('#app')
  // 直接将dom元素返回
  return;
}

// 遍历所有节点，将找到的{{}}标签中的字符串用data中对应属性的值进行替换
function compiler (node, vm) {
  const childNodes = Array.from(node.childNodes);
  for (let i = 0; i < childNodes.length; i++) {
    const childNode = childNodes[i];
    if (childNode.nodeType === 1) { // 元素
      compiler(childNode, vm);
    } else if (childNode.nodeType === 3) { // 文本，需要对{{}}中的内容进行替换
      compilerText(childNode, vm);
    }
  }
}

Vue.prototype._update = function (vnode) {
  const vm = this;
  let preVNode = vm.preVNode;
  if (!preVNode) {
    // 根据虚拟节点生成真实dom，并append到vm.$el中
    vm.$el = render(vnode, vm.$el);
  } else {
    vm.$el = patch(preVNode, vnode);
  }
  vm.preVNode = vnode;
};
Vue.prototype._render = function () {
  const vm = this;
  const { render } = vm.$options;
  return render.call(vm, h);
};
Vue.prototype.$mount = function () {
  const vm = this;
  let { el } = vm.$options;
  // el: 为Vue实例提供一个已经存在的DOM元素来进行挂载。el可以是一个CSS选择器字符串，或者是一个真实的HTML元素
  // 实例被挂载之后，被解析的元素将作为vm.$el被访问
  el = vm.$el = query(el);
  const updateComponent = () => {
    vm._update(vm._render());
  };
  // 渲染时通过watcher来渲染
  // vue2.0通过watcher来进行组件级更新
  new Watcher(vm, updateComponent);

  // 每个数据更改了，需要重新渲染
};
Vue.prototype.$watch = function (exprOrFn, callback, options) {
  const vm = this;
  new Watcher(vm, exprOrFn, callback, { user: true, ...options });
};
// vue初始化，可以具体再细分初始化各个配置
Vue.prototype._init = function (options) {
  // 将this重新取一个可以理解的名字，方便理解
  const vm = this;
  // 将所有配置项放到实例的$options选项
  // 用于当前Vue实例的实例化选项。当你想要在实例化选项中包含一些自定义属性时，这个属性是有用的。
  // @see: https://vuejs.org/v2/api/#vm-options
  vm.$options = options;
  // MVVM原理：需要数据重新初始化
  // 拦截数组的方法和对象的属性
  initState(vm);

  // 初始化工作 vue1.0 =>
  // 文本编译
  if (vm.$options.el) {
    vm.$mount();
  }
};
export default Vue;
