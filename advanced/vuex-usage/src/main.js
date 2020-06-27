import Vue from 'vue';
import App from './App.vue';
import store from './store';
// 动态注册module
store.register('e', {
  state: {
    name: 'e-state'
  },
  getters: {
    eName (state) {
      return state.name + 100;
    }
  },
  mutations: {
    dynamicMutations () {

    }
  },
  actions: {
    dynamicActions () {

    }
  }
});
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
