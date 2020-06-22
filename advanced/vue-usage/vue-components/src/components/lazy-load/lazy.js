import { _Vue } from '@/components/lazy-load/index';

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

    loadImage (resolve, reject) {
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
    }

    add (el, binding, vnode) {
      // manipulate the DOM
      // 检测滚动，看图片是否出现在可视区域

      // 这里并不能获取到真实DOM，在inserted钩子调用时可以获取到真实DOM
      Vue.nextTick(() => {
        const parent = this.getScrollParent(el);
        const listener = new ReactiveListener({
          el,
          src: binding.value,
          elRender: this.elRender.bind(this),
          options: this.options
        });
        this.listenerQueue.push(listener);
        if (!this.isBindScrollEvent) {
          parent.addEventListener('scroll', this.lazyHandler.bind(this));
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
      listener.el.setAttribute('src', src);
    }
  };
};

export default Lazy;
