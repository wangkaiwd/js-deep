const defaultProps = {
  disabled: false,
  delay: 200, // 滚动方法触发的节流时间
  distance: 30, // 触发执行加载数据方法时距离底部的距离
  immediate: true, // 初始状态内容没有填满时是否立即执行加载数据的方法
};
const getContainer = (el) => {
  let parent = el;
  while (parent) {
    if (parent === document) {
      return document; // 返回document表示没有找到带有overflow的父级
    }
    const computedStyle = getComputedStyle(parent);
    const overflowY = computedStyle.getPropertyValue('overflow-y');
    // match 通过正则匹配字符串，将匹配到的结果作为数组返回。如果什么都没有匹配到返回null
    if (overflowY.match(/auto|scroll/g)) {
      return parent;
    }
    parent = parent.parentNode;
  }
};
let timerId = null;
const handleScroll = function (load, vm) {
  if (timerId) {return; }
  const { distance, delay, disabled } = getOptions(this, vm);
  if (disabled) {return;}
  timerId = setTimeout(() => {
    const scrollBottom = this.scrollHeight - this.clientHeight - this.scrollTop;
    if (scrollBottom <= distance) {
      load();
    }
    timerId = null;
  }, delay);
};
const isEmpty = (value) => {
  return value == null;
};
const getOptions = (el, vm) => {
  return Object.entries(defaultProps).reduce((props, [key, val]) => {
    // attributes and properties: https://javascript.info/dom-attributes-and-properties
    const attr = el.getAttribute(`infinite-scroll-${key}`);
    props[key] = isEmpty(vm[attr]) ? val : vm[attr];
    return props;
  }, {});
};
const scope = 'infinite-scroll';
const infiniteScroll = {
  // When bound element is inserted into the DOM...
  // vnode.context 表示组件实例
  inserted (el, binding, vnode) {
    const load = binding.value;
    // 虚拟节点所在组件的实例
    const vm = vnode.context;
    const container = getContainer(el);
    const { immediate } = getOptions(el, vm);
    if (container === document) return;
    // 这里为什么不能叫onScroll?
    const onScroll = handleScroll.bind(el, load, vm);
    el[scope] = {
      // share information across hooks
      onScroll,
      container
    };
    if (immediate) {
      const observer = new MutationObserver(onScroll);
      observer.observe(container, {
        childList: true,
        attributes: true,
        subtree: true
      });
      onScroll();
    }
    container.addEventListener('scroll', onScroll);
  },
  // called only once, when the directive is unbound from element
  unbind (el) {
    const { onScroll, container } = el[scope];
    if (container) {
      container.removeEventListener('scroll', onScroll);
      el[scope] = null;
    }
  }
};

export default infiniteScroll;
