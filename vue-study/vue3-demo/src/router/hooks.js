import store from '@/store/index';
import { isEmptyObject } from '@/shared/util';

export default {
  cancelRequest (to, from, next) {
    if (!store) {return next();}
    const { reqs } = store.state;
    if (!isEmptyObject(reqs)) {
      Object.keys(reqs).forEach(key => reqs[key].cancel('cancel request!'));
      store.commit('setReqs', {});
    }
    next();
  }
};
