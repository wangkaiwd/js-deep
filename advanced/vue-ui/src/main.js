import Vue from 'vue';
import App from './App.vue';
import LtUI from './packages/index';

Vue.config.productionTip = false;
Vue.use(LtUI);
new Vue({
  render: h => h(App),
}).$mount('#app');
