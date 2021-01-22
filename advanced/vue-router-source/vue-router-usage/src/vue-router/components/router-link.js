// 要动态渲染标签，所以使用render组件
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
  },
  methods: {
    onClick () {
      this.$router.push(this.to);
    }
  },
  render (h) {
    const tag = this.tag;
    return <tag onClick={this.onClick}>{this.$slots.default}</tag>;
  }
};
