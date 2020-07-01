class History {
  constructor (router) {
    this.router = router;
  }

  transitionTo (location, callback) {
    this.router.match(location);
    if (typeof callback === 'function') {
      callback();
    }
  }

  setupListener () {
    // hash 路由模式
    window.addEventListener('hashchange', () => {
      this.transitionTo(window.location.hash.slice(1));
    });
  }
}

export default History;
