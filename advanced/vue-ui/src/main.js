import Vue from 'vue';
import App from './App.vue';
import LtUi from './packages/index';

Vue.config.productionTip = false;
Vue.use(LtUi);
new Vue({
  render: h => h(App),
}).$mount('#app');
