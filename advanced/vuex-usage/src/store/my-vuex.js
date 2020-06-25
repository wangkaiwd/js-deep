class Store {
  constructor () {}
}

const install = (Vue) => {
  // 要让每个组件够可以通过实例的$store属性来访问vuex中的store
  // 方案1. 绑定到Vue的原型上，这样每个实例都会拥有对应的方法
  // Vue.prototype.$store = xxx 这样即使在配置项中没有传入store属性，也会为所有的子组件添加$store,注入性比较强
  // 我们只想让传入store属性的实例及其所有子实例拥有$store属性
  // 方案2. 通过混合器进行混合
  // official documentation: https://vuejs.org/v2/guide/mixins.html#Option-Merging
  // merge strategies:
  //  1. data: recursive merge every object property. component's data taking priority in case of conflict
  //  2. hooks: merge into an array. Mixin hooks will be called before the component's own hooks
  //  3. others: methods,components,directive: will be merge into the same object when there are conflicting keys in these object
  //     and the component's options will take priority
  Vue.mixin({
    // Hooks functions with the same name are merged into an array so that all of them will be called
    // Mixin hooks will be called before the component's own hooks
    beforeCreate () {

    }
  });
};
const Vuex = {
  Store,
  install
};

export default Vuex;
