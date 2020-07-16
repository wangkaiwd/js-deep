import Vue from 'vue';
import Vuex from 'vuex';
import request from './demo/request';
import { authRoutes } from './router';

Vue.use(Vuex);

function getRoutes (authList) {
  const auths = authList.map(item => item.auth);
  const filterRoutesByAuth = (authRoutes) => {
    // 递归遍历
    return authRoutes.filter((route) => {
      if (auths.includes(route.name)) {
        if (route.children) { // 更改了route
          // 每次执行filterRoutesByAuth都会有一个全新的执行上下文，这样会有当前的route
          route.children = filterRoutesByAuth(route.children);
        }
        return route;
      }
    });
  };
  return filterRoutesByAuth(authRoutes);
}

export default new Vuex.Store({
  state: {
    // hasPermission: false, // 这个属性不需要
    authList: [],
  },
  getters: {
    hasPermission (state) {
      return state.authList.length > 0;
    }
  },
  mutations: {
    setAuthList (state, authList) {
      state.authList = authList;
    }
  },
  actions: {
    getAuthList ({ commit }) {
      return request().then((response) => {
        const authList = response
          .map(item => ({ name: item.name, auth: item.auth }));
        commit('setAuthList', authList);
        return response;
      });
    },
    getAuthRoute ({ dispatch }) { // action中可以派发其它action
      return dispatch('getAuthList').then((response) => getRoutes(response));
    }
  }
});
