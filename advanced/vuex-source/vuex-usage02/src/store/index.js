import Vue from 'vue';
import Vuex from './my-vuex';
// import Vuex from 'vuex';

Vue.use(Vuex);

function logger (store) {
  let preState = JSON.stringify(store.state, null, 2);
  store.subscribe((mutation, state) => {
    const latestState = JSON.stringify(state, null, 2);
    console.log('preState', preState);
    console.log('next', latestState);
    preState = latestState;
  });
}

export default new Vuex.Store({
  plugins: [logger],
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
