const getContainer = (el) => {
  let parent = el;
  while (parent) {
    if (parent === document) {
      return document;
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
const onScroll = function () {
  console.log('scroll');
};
const scope = 'infinite-scroll';
const infiniteScroll = {
  // When bound element is inserted into the DOM...
  inserted (el) {
    const container = getContainer(el);
    const scroll = onScroll.bind(el);
    el[scope] = { // share information across hooks
      scroll,
      container
    };
    container.addEventListener('scroll', scroll);
  },
  // called only once, when the directive is unbound from element
  unbind (el) {
    const { onScroll, container } = el;
    container.removeEventListener('scroll', onScroll);
  }
};

export default infiniteScroll;
