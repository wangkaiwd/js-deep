import Vue from 'vue';
// import createLogger from 'vuex/dist/logger';
// import Vuex from 'vuex';
import Vuex from './my-vuex';

Vue.use(Vuex);

// A Vuex plugin is simply a function that receives the store as the only argument
function logger (store) {
  let preState = JSON.parse(JSON.stringify(store.state));
  // 在mutation改变store中state之前记录值，值更新后更新preState
  store.subscribe((mutation, state) => {
    // called after every mutation.
    console.log('preState', preState);
    console.log('mutation', mutation);
    const nextState = JSON.parse(JSON.stringify(state));
    console.log('nextState', nextState);
    preState = nextState;
  });
}

function persists (store) {
  const local = localStorage.getItem('vuex:state');
  const initialState = local == null ? store.state : JSON.parse(local);
  store.replaceState(initialState);
  store.subscribe((mutation, state) => {
    // 这里可以做节流 throttle lodash
    localStorage.setItem('vuex:state', JSON.stringify(state));
  });
}

export default new Vuex.Store({
  plugins: [
    // logger,
    persists
  ],
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
      namespaced: true,
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
      namespaced: true,
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
          mutations: {
            syncChange (state) {
              console.log('c', state);
            }
          },
          modules: {
            d: {
              namespaced: true,
              state: {
                name: 'd-state'
              },
              getters: {
                stateName (state) {
                  return state.name + 'xxx';
                }
              },
              mutations: {
                syncChange (state) {
                  console.log('d', state);
                }
              },
            }
          }
        }
      }
    }
  }
});
