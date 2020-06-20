import Vue from 'vue';

Vue.prototype.$dispatch = function (eventName, ComponentName, params) {
  let parent = this.$parent;
  while (parent) {
    if (parent.$options.name === ComponentName) {
      parent.$emit(eventName, params);
      break;
    }
    parent = parent.$parent;
  }
};

// 父组件直接调用子组件的$emit方法，来触发数据更新（使用场景难以想象）
Vue.prototype.$broadcast = function (eventName, ComponentName, params) {
  const children = this.$children;

  function iterate (children) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.$options.name === ComponentName) {
        child.$emit(eventName, params);
        break;
      } else {
        if (child.$children) {
          iterate(child.$children);
        }
      }
    }
  }

  iterate(children);
};

// 基于根实例的发布订阅来进行组件通信
Vue.prototype.$bus = new Vue();
// 组件内使用
// this.$bus.on('xxx',(params) => {
//    console.log(params)
// })
// this.$bus.emit('xxx',{name:'xxx'})
