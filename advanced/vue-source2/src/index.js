import Vue from 'vue';

const vm = new Vue({
  el: '#app',
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
console.log('vm', vm);
vm.person.name = 'ls';

