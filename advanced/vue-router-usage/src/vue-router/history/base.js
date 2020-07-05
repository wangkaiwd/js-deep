// 记录当前路由信息，以及路由对应的所有组件信息
export function createRoute (record, location) {
  const matched = [];
  while (record) {
    // 这里要从父到子进行排列，而现在遍历的时候是从子到父
    matched.unshift(record);
    record = record.parent;
  }
  return {
    ...location,
    matched
  };
}

function runQueue (queue, iterator, callback) {
  // 这里不能使用for循环
  function step (index) {
    if (queue.length === index) {
      return callback();
    }
    let hook = queue[index];
    iterator(hook, () => {
      step(index + 1);
    });
  }

  step(0);
}

class History {
  constructor (router) {
    this.router = router;
    // 当前匹配到的地址及组件信息，即$route属性
    this.current = createRoute(null, {
      path: '/'
    });
    this.listener = undefined;
  }

  transitionTo (path, callback) {
    const route = this.router.match(path);
    if (path === this.current.path && route.matched.length === this.current.matched.length) {
      return;
    }
    const queue = this.router.beforeEachs;
    const iterator = (hook, next) => {
      hook(route, this.current, next);
    };
    runQueue(queue, iterator, () => {
      this.updateRoute(route);
    });
    if (typeof callback === 'function') {
      callback();
    }
  }

  updateRoute (route) {
    this.current = route;
    this.listener && this.listener(this.current);
  }

  setupListeners () {
    // hash 路由模式
    window.addEventListener('hashchange', () => {
      this.transitionTo(window.location.hash.slice(1));
    });
  }

  listen (cb) {
    this.listener = cb;
  }
}

export default History;
