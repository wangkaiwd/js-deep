import Vue from 'vue';
// import Vuex from 'vuex';
import Vuex from './my-vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    age: 18
  },
  mutations: {
    syncChange (state, payload) {
      state.age += payload;
    }
  },
  actions: {
    asyncChange ({ commit }, payload) {
      setTimeout(() => {
        commit('syncChange', payload);
      }, 1000);
    }
  },
  modules: {}
});
