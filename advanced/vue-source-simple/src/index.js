import Vue from 'vue';

const vm = new Vue({
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

vm.person.name = 'ls';
console.log(vm.person.name);
