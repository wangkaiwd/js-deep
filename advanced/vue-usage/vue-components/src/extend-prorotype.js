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
