export default {
  state: {
    collapsed: false
  },
  mutations: {
    setCollapse (state, status) {
      state.collapsed = status;
    }
  }
};
