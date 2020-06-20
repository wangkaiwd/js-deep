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
