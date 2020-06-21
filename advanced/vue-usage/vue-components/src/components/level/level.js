// render jsx组件是.js文件，直接将配置项传出，不需要template
export default {
  props: {
    level: {
      type: String
    }
  },
  render (h) {
    return h('h' + this.level, this.$slots.default);
  }
};
