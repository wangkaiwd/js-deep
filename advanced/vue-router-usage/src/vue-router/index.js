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

  // 当通过router.push进行跳转时，页面地址并不会更改，所以要为window.location.hash重新赋值
  // 当赋值之后，又会调动window.onhashChange事件，此时多次调用transitionTo方法，地址和matched相同
  // 这会导致重新匹配，需要屏蔽
  push (to) {
    this.history.transitionTo(to, () => {
      window.location.hash = to;
    });
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

