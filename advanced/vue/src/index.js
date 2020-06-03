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
vm.msg = 'hello world';
vm.person.name = 'ls';
console.log(vm._data);


