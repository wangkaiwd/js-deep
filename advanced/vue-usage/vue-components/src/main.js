import Vue from 'vue';
import App from './App.vue';
import LazyLoad from '@/components/lazy-load/index';
import './extend-prorotype';
import loading from '@/assets/loading-1.gif';
import './assets/styles/reset.scss';
import InfiniteScroll from './components/directives/infinite-scroll';

Vue.config.productionTip = false;
Vue.directive('infinite-scroll', InfiniteScroll);
Vue.use(LazyLoad, {
  preload: 1.3,
  loading
});
new Vue({
  render: h => h(App),
}).$mount('#app');

// 创建一个Vue实例
// const vm = new Vue({
//   name: 'OffDocument',
//   render: h => h('div', 'hello')
// }).$mount();
//
// document.body.appendChild(vm.$el);

// 创建一个Vue的子类
// const Ctor = Vue.extend({
//   name: 'OffDocument',
//   render: h => h('div', 'hello')
// });
//
// const vm = new Ctor().$mount();
// document.body.appendChild(vm.$el);

// 感觉俩种方法都可以，在new的时候可以通过propsData传递属性值
