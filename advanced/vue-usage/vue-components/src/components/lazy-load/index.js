import Lazy from '@/components/lazy-load/lazy';

let _Vue = undefined;
export default {
  install (Vue, options) {
    _Vue = Vue;
    const LazyClass = Lazy(Vue);
    const lazy = new LazyClass(options);
    // 为Vue指定一个全局自定义指令
    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy)
    });
  }
};

export { _Vue } ;
