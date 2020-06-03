// 如何使用vue

import Vue from 'vue';

const vm = new Vue({
  el: '#app',
  data () {
    return {
      msg: 'hello',
      person: { name: 'zs', age: 10 },
      arr: [1, 2, 3],
      f: function () {
        console.log(f);
      }
    };
  },
  computed: {},
  watch: {}
});

// Vue实例对象

// 并不会触发Object.defineProperty中的set方法
vm.arr.push(4);
console.log(vm);


