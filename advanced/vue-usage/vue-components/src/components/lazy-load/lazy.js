import { _Vue } from '@/components/lazy-load/index';
import { throttle } from 'lodash';
// console.log('vue', _Vue);
const Lazy = (Vue) => {
  class ReactiveListener {
    constructor ({ el, src, elRender, options }) {
      this.el = el;
      this.src = src;
      this.elRender = elRender;
      this.options = options;
      this.state = 'init';
    }

    checkInView () {
      // 必须为图片指定宽高，否则可能获取不到图片的dimension
      const { top } = this.el.getBoundingClientRect();
      return top <= window.innerHeight * this.options.preload;
    }

    load () {
      this.state = 'loading';
      this.elRender(this);
      this.loadImage(() => {
        this.elRender(this);
      }, () => {
        this.elRender(this);
      });
    }

    // 创建一个假的image模拟加载过程，对应的事件触发后，为真实的img设置属性
    loadImage (resolve, reject) {
      // 这会同一个图片加载2次
      const image = new Image();
      image.src = this.src;
      image.addEventListener('load', () => {
        this.state = 'loaded';
        resolve();
      });
      image.addEventListener('error', () => {
        this.state = 'error';
        reject();
      });
    }
  }

  // 值会发生变化
  // console.log('_Vue', _Vue);
  return class LazyClass {
    constructor (options) {
      this.options = options;
      this.listenerQueue = [];
      this.isBindScrollEvent = false;
      this.lazyHandler = throttle(this.lazyHandler.bind(this), 300);
    }

    add (el, binding, vnode) {
      // manipulate the DOM
      // 检测滚动，看图片是否出现在可视区域

      // 这里并不能获取到真实DOM，在inserted钩子调用时可以获取到真实DOM
      // 首次渲染会直接渲染
      // 之后再更新vm中的值的时候，会先将watcher去重后放入队列
      // 同一个watcher会在所有的数据更新完成后，再统一更新视图
      Vue.nextTick(() => {
        const parent = this.getScrollParent(el);
        const listener = new ReactiveListener({
          el,
          src: binding.value,
          elRender: this.elRender.bind(this),
          options: this.options
        });
        this.listenerQueue.push(listener);
        // throttle 在指定间隔内执行函数
        if (!this.isBindScrollEvent) {
          parent.addEventListener('scroll', this.lazyHandler);
          this.isBindScrollEvent = true;
        }
        // 这一行代码会极大的影响到性能
        this.lazyHandler();
      });
    }

    lazyHandler () {
      this.listenerQueue.forEach(listener => {
        if (listener.state !== 'init') {return;}
        const catIn = listener.checkInView();
        catIn && listener.load();
      });
    }

    getScrollParent (el) {
      let parent = el.parentNode;
      while (parent) {
        const overflowX = getComputedStyle(parent)
          .getPropertyValue('overflow-x');
        if (overflowX === 'auto') {
          break;
        }
        parent = parent.parentNode;
      }
      return parent;
    }

    elRender (listener) {
      let src = '';
      switch (listener.state) {
        case 'loading':
          src = listener.options.loading || '';
          break;
        case 'error':
          src = listener.options.error || '';
          break;
        case 'loaded':
          src = listener.src;
          break;
      }
      // 修改图片的真实路径
      listener.el.setAttribute('src', src);
    }
  };
};

export default Lazy;
