import Vue from 'vue';
// import Vuex from './my-vuex';
import Vuex from 'vuex';

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
      namespaced: true,
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
