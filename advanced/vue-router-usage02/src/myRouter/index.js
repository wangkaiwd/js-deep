import install from './install';
import createMatcher from './create-matcher';
import HashHistory from './history/hash';

class VueRouter {
  constructor (options) {
    this.matcher = createMatcher(options.routes);
    this.history = new HashHistory(this);
  }

  init (app) {
    console.log(app);

  }


}

VueRouter.install = install;

export default VueRouter;

