export default {
  state: {
    collapsed: false,
    loading: false
  },
  mutations: {
    setCollapse (state, status) {
      state.collapsed = status;
    },
    setLoading (state, status) {
      state.loading = status;
    }
  }
};
