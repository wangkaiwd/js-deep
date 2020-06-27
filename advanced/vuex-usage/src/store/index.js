import Vue from 'vue';
// import Vuex from 'vuex';
import Vuex from './my-vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    age: 18,
    person: {
      name: 'zs'
    }
  },
  getters: {
    personName (state) {
      return state.person.name;
    }
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
  // 不加命名空间时，模块都会被注册到全局命名空间之下，
  // 这将会导致多个modules的mutations和actions都响应同一个type
  modules: {
    a: {
      state: {
        name: 'a-state'
      },
      mutations: {
        syncChange (state) {
          console.log('a', state);
        }
      }
    },
    b: {
      state: {
        name: 'b-state',
      },
      mutations: {
        syncChange (state) {
          console.log('b', state);
        }
      },
      modules: {
        c: {
          state: {
            name: 'c-state'
          },
          modules: {
            d: {
              state: {
                name: 'd-state'
              },
              getters: {
                stateName (state) {
                  return state.name + 'xxx';
                }
              }
            }
          }
        }
      }
    }
  }
});
