import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

store.registerModule(['d'], {
  state: {
    age: 12
  },
  mutations: {
    changeAge (state, payload) {
      state.age += payload;
    }
  }
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
