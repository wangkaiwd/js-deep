import install from './install';
import createMatcher from './create-matcher';
import HashHistory from './history/hash';

class VueRouter {
  constructor (options) {
    this.matcher = createMatcher(options.routes);
    this.history = new HashHistory(this);
  }

  init (app) {
    const { history } = this;
    const setupListener = () => {
      history.setupListeners();
    };
    history.transitionTo(history.getCurrentLocation(), setupListener);
    history.listen((route) => {
      app._route = route;
    });
  }

  match (path) {
    return this.matcher.match(path);
  }

  push (path) {
    this.history.transitionTo(path, () => {
      location.hash = path;
    });
    // location.hash = path;
  }
}

VueRouter.install = install;

export default VueRouter;

