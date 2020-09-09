import Vue from '../../source/vue';

const vm = new Vue({
  el: '#app',
  data () {
    return { msg: 'hello' };
  },
  render (h) {
    return h('h3', { id: 'msg' }, this.msg);
  }
});
setTimeout(() => {
  vm.msg = 'world';
}, 2000);
