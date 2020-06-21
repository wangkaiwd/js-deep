import { _Vue } from '@/components/lazy-load/index';

// console.log('vue', _Vue);
const Lazy = (Vue) => {
  // 值会发生变化
  // console.log('_Vue', _Vue);
  return class LazyClass {
    constructor (options) {
      this.options = options;
    }

    add (el, binding, vnode) {
      // manipulate the DOM
      // 检测滚动，看图片是否出现在可视区域
    }
  };
};

export default Lazy;
