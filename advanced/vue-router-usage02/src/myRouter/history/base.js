import { getHash } from './hash';
import { createRoute } from '../create-matcher';

class History {
  constructor (router) {
    this.router = router;
    this.current = createRoute(null, { path: '/' });
    this.cb = undefined;
  }

  transitionTo (path, callback) { // 根据path来进行匹配component
    const route = this.router.match(path); // 当前路由信息
    this.current = route;
    this.cb && this.cb(route);
    if (typeof callback === 'function') {callback();}
  }

  setupListeners () {
    window.addEventListener('hashchange', () => {
      this.transitionTo(getHash());
    });
  }

  listen (cb) {
    this.cb = cb;
  }
}

export default History;
