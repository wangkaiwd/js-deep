import Vue from 'vue';

const install = (Vue) => {
  Vue.mixin({
    beforeCreate () { // 状态初始化之前，此时数据还都不是响应式的
      // initLifecycle
      // initEvents
      // initRender
      // beforeCreate 钩子中已经处理好了$parent和$children，但是还没有initState
      // 此时的数据还不是响应式的
      if (this.$options.store) {
        // 手动给实例上添加属性，并不具有响应性
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  });
};

function forEach (obj, cb) {
  if (!obj) {return;}
  Object.keys(obj).forEach(key => {
    cb(key, obj[key]);
  });
}

class Store {
  constructor (options) {
    this.options = options;
    // 此时state并不具有响应式
    this.state = {};
    // properties that start with _ or $ will not be proxied on the Vue instance because of they may conflict with Vue's internal properties and API methods
    this.vm = new Vue({
      data () {
        return {
          state: {}
        };
      }
    });
    this.mutations = {};
    this.actions = {};
    this.getters = {};
    this.installModules(this.options);
  }

  installModules (options, path = []) {
    const { state, mutations, actions, getters, modules } = options;
    this.registerState(state, path);
    this.registerMutations(mutations, state);
    this.registerActions(actions);
    if (!modules) {return;}
    forEach(modules, (key, module) => {
      this.installModules(module, path.concat(key));
    });
  }

  commit (type, payload) {
    const entries = this.mutations[type];
    if (entries) {
      entries.forEach(entry => {
        entry(payload);
      });
    }
  }

  dispatch (type, payload) { // 需要处理成Promise
    const entries = this.actions[type];
    if (entries) {
      entries.forEach(entry => {
        entry(payload);
      });
    }
  }

  getParent (path) {
    return path.slice(0, -1).reduce((memo, cur) => {
      return memo[cur];
    }, this.state);
  }

  // {
  //   modules: {
  //      a: {
  //        b: {
  //        }
  //      }
  //   }
  // }
  // [a,b]
  registerState (state, path) {
    const key = path[path.length - 1];
    let parent = this.getParent(path);
    if (key) {
      // parent[key] = state;
      this.vm.$set(parent, key, state);
    } else {
      this.vm.state = this.state = state;
    }
  }

  registerMutations (mutations, state) {
    forEach(mutations, (key, mutation) => {
      const entries = this.mutations[key] = this.mutations[key] ?? [];
      entries.push((payload) => { // 这里并不是直接传入了mutation，而是又构建了一个新的函数，这样在当前作用域中便可以找到mutation对应的state，从而传递给真正额mutation
        mutation(state, payload);
      });
    });
  }

  registerActions (actions) {
    forEach(actions, (key, action) => {
      const entries = this.actions[key] = this.actions[key] ?? [];
      entries.push((payload) => { // 这里并不是直接传入了action，而是又构建了一个新的函数
        action(this, payload);
      });
    });
  }

  // 动态注册模块
  registerModule () {

  }
}

export default {
  install,
  Store
};
