import { initState } from './observe';
import Watcher from './observe/watcher';

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

Vue.prototype._update = function () {
  const vm = this;
  // 用 用户传入的数据更新 视图
  // 将el中的{{msg}} 替换为真实的数据
  // 文档碎片会存在于内存中，而不是主DOM树的一部分。可以先创建文档碎片，然后追加元素到文档碎片中，最终追加文档碎片到DOM树中
  // 在DOM树中，文档碎片被其所有子元素替换。
  const node = document.createDocumentFragment();
  let firstChild;
  while (firstChild = vm.$el.firstChild) {
    // 如果给定子节点是文档中已经存在的一个节点的引用，appendChild从当前的位置移动这个节点到新的位置(追加节点到某个其它节点之前，没有必要从节点的父节点移除该节点)
    // appendChild:如果节点已经存在的话，移动这个节点
    // 从el中移动到node对应的文档碎片中
    node.appendChild(firstChild);
  }
  console.log('node', node);
};
Vue.prototype.$mount = function () {
  const vm = this;
  let { el } = vm.$options;
  // el: 为Vue实例提供一个已经存在的DOM元素来进行挂载。el可以是一个CSS选择器字符串，或者是一个真实的HTML元素
  // 实例被挂载之后，被解析的元素将作为vm.$el被访问
  el = vm.$el = query(el);
  const updateComponent = () => {
    vm._update();
  };
  // 渲染时通过watcher来渲染
  // vue2.0通过watcher来进行组件级更新
  new Watcher(vm, updateComponent);
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
  if (vm.$options.el) {
    vm.$mount();
  }
};
export default Vue;
