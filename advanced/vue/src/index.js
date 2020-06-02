// 如何使用vue

import Vue from 'vue';

const vm = new Vue({
  el: '#app',
  data () {
    return {
      msg: 'hello',
      person: { name: 'zf', age: 10 },
      arr: [1, 2, 3]
    };
  },
  computed: {},
  watch: {}
});

// Vue实例对象
console.log(vm);


