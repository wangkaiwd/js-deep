import Vue from 'vue';

const vm = new Vue({
  el: '#app',
  data () {
    return {
      msg: 'hello'
    };
  },
  render (h) { // 更改this指向为Vue实例
    return h('div', { id: 'container' }, h('span', { id: 'b' }, this.msg));
  }
});
setTimeout(() => {
  vm.msg = 'hello world!';
}, 3000);
