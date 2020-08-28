import Vue from 'vue';

const vm = new Vue({
  el: '#app',
  // The object must be plain: native objects such as browser API objects and prototype properties are ignored
  data () {
    return {
      msg: 'hello vue',
      person: {
        name: 'zs',
        age: 12
      },
      arr: [1, 2, 3]
    };
  }
});

// vm.arr[0] = 0;
