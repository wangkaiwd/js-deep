import Vue from 'vue';
import Vuex from './my-vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    a: 1
  },
  mutations: {
    addA (state) {
      state.a += 1;
    }
  },
  actions: {},
  modules: {
    b: {
      state: {
        c: 'zs'
      },
      mutations: {
        addC (state) {
          state.c += 1;
        }
      }
    }
  }
});
