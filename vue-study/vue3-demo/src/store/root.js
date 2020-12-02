export default {
  state: {
    collapsed: false,
    loading: false,
    reqs: {}
  },
  mutations: {
    setCollapse (state, status) {
      state.collapsed = status;
    },
    setLoading (state, status) {
      state.loading = status;
    },
    setReqs (state, reqs) {
      state.reqs = reqs;
    },
    deleteReqs (state, key) {
      delete state.reqs[key];
    }
  }
};
