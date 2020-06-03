import { initState } from './observe';

function Vue (options) {
  this._init(options);
}

// vue初始化，可以具体再细分初始化各个配置
Vue.prototype._init = function (options) {
  // 将this重新取一个可以理解的名字，方便理解
  const vm = this;
  // 将所有配置项放到实例的$options选项
  // 用于当前Vue实例的实例化选项。当你想要在实例化选项中包含一些自定义属性时，这个属性是有用的。
  // @see: https://vuejs.org/v2/api/#vm-options
  vm.$options = options;
  // MVVM原理：需要数据重新初始化
  initState(vm);
};
export default Vue;
