import { install } from './install';
import createMatcher from './createMatcher';

class VueRouter {
  constructor (options) {
    // this.options = options;
    this.matcher = createMatcher(options.routes || []);
  }

  init (app) {
    console.log(app);
  }
}

VueRouter.install = install;

export default VueRouter;
