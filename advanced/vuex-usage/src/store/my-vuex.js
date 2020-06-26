import ModuleCollection from './moduleCollection';

let Vue;

export const forEach = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(key, obj[key], obj);
  });
};

class Store {
  constructor (options) {
    // this.state = options.state;
    // 保证$store.state是响应式的
    // vuex利用另外一个Vue实例，实现了响应式
    // 该Vue实例是如何知道更新哪个地方的视图的？
    this.vm = new Vue({
      data: { state: options.state }
    });
    this.getters = {};
    this.mutations = {};
    this.actions = {};
    // 由于涉及到了模块的概念，所以需要递归格式化数据结构
    // 为什么要处理成这样？好处是什么？
    // const root = {
    //   _raw: rootModule,
    //   _children: rootModule.modules,
    //   state: rootModule.state
    // };
    this.modules = new ModuleCollection(options);
    console.log('modules', this.modules);
  }

  // 使用get关键字，属性将被定义在实例的原型上
  get state () {
    return this.vm.state;
  }

  // 通过bind赋值为this的属性来更改this指向的简写
  // this.commit = this.commit.bind(this)
  commit = (type, payload) => {
    // if (this.mutations[type]) {
    //   this.mutations[type](this.state, payload);
    // }
  };

  dispatch (type, payload) {
    // if (this.actions[type]) {
    //   // 传入的参数为store实例，可以通过解构赋值取出commit属性
    //   // 这里commit在执行的时候，this指向了undefined
    //   this.actions[type](this, payload);
    // }
  }
}

const install = (_Vue) => {
  Vue = _Vue;
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
      // 为根组件即所有的子组件混入$store属性
      const { store } = this.$options;
      if (store) { // 根实例
        // 这样直接赋值不具有响应式，新增和删除对象属性都不具有响应式
        this.$store = store;
      } else { // 子实例
        console.log('inject');
        // 在组件渲染的时候会进行递归渲染，先渲染父组件，然后再渲染所有的子组件
        // 这样可以通过$parent.$store一级一级获取到父组件的$store属性
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  });
};
const Vuex = {
  Store,
  install
};

export default Vuex;
