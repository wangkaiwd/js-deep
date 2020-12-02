import store from '@/store/index';
import { isEmptyObject } from '@/shared/util';

export default {
  cancelRequest (to, from, next) {
    if (!store) {return next();}
    const { reqs } = store.state;
    if (!isEmptyObject(reqs)) {
      console.log('reqs', reqs);
      Object.keys(reqs).forEach(cancel => cancel());
      store.commit('setReqs', {});
    }
    next();
  }
};
