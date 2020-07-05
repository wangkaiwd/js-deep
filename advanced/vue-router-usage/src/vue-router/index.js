import { install } from './install';
import createMatcher from './createMatcher';
import HashHistory from './history/hash';

class VueRouter {
  constructor (options) {
    // this.options = options;
    this.matcher = createMatcher(options.routes || []);
    // vue-router中有三种路由模式：
    // 1. hash 2. history 3. abstract
    this.history = new HashHistory(this);
  }

  match (path) {
    return this.matcher.match(path);
  }

  push (to) {
    this.history.transitionTo(to);
  }

  init (app) {
    // 1. 首次输入路径时，根据路由地址，匹配对应的组件进行渲染
    // 2. 监听路由变化，完成之后的组件更新操作
    const setupHashListener = () => {
      this.history.setupListeners();
    };
    this.history.transitionTo(this.history.getCurrentLocation(), setupHashListener());
    this.history.listen((route) => {
      app._route = route;
    });
  }
}

VueRouter.install = install;

export default VueRouter;

