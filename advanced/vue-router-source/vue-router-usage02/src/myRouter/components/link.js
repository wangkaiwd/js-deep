export default {
  name: 'RouterLink',
  props: {
    to: {
      type: String,
      require: true,
    },
    tag: {
      type: String,
      default: 'a'
    }
  },
  methods: {
    onClick () {
      this.$router.push(this.to);
    }
  },
  render () {
    const { tag } = this;
    return <tag onClick={this.onClick}>{this.$slots.default}</tag>;
  }
};
