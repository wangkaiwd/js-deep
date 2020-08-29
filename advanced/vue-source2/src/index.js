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
// 没有为数组的索引key设置set/get方法，只会触发arr的get方法
// console.log(vm.arr[0]);
vm.arr.push({ a: 1 });
console.log(vm.arr[3].a);
