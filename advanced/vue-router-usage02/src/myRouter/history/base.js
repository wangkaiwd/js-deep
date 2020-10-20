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
    // 当点击进行地址切换时，会执行transitionTo来进行跳转匹配
    // 而地址切换还会触发hashchange事件，还会调用transitionTo方法，此时path相同
    // 初始化时，this.current = {path:'/',matched:[]}, 而此时根路径对应的路由信息为 route = {path: '/', matched: [{path: '/', name: 'Home', component: Home, parent: undefined}]}
    // 所以也对matched的长度进行比对，防止首次渲染时没有内容
    if (path === this.current.path && route.matched.length === this.current.matched.length) {
      return;
    }
    // 兼容hashchange事件，以及进行路由切换时进行hash值更新
    if (typeof callback === 'function') {callback();}
    const queue = this.router.beforeEachs;

    const step = (index, callback) => {
      if (index === queue.length) {
        return callback();
      }
      const hook = queue[index];
      hook(route, this.current, () => step(index + 1, callback));
    };

    step(0, () => this.updateRoute(route));
  }

  updateRoute (route) {
    this.current = route;
    this.cb && this.cb(route);
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
