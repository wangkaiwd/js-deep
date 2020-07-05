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

class History {
  constructor (router) {
    this.router = router;
    this.current = createRoute(null, {
      path: '/'
    });
    this.listener = undefined;
  }

  transitionTo (path, callback) {
    this.current = this.router.match(path);
    this.listener && this.listener(this.current);
    if (typeof callback === 'function') {
      callback();
    }
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
