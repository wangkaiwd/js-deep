// 如何使用vue

import Vue from 'vue';

const vm = new Vue({
  el: '#app',
  data () {
    return {
      msg: 'hello',
      person: { name: 'zs', age: 10 },
      arr: [{ a: 1 }, 1, 2, 3],
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
// vm.arr.push(4);

// 不会被观察到的实际含义是说不会触发Object.defineProperty中的setter/getter的方法
// 如果数组中新增的内容是对象
// vm.arr[0].a = 100;
// console.log(vm.arr[1] = '1');
// 不会被观察
vm.person.sex = '南';
console.log(vm);

// 什么样的数组会被观察：
// [ 0, 1, 2] 数组中每一项并不是对象，并不会被观察
// [0,1,2].length-- 数组长度的变化没有进行监控

// [{a:1}]  会对数组中的对象进行观察
// [].push/unshift/splice 方法可以被监控 vm.$set 内部调用的就是数组的splice方法

// 1. 不能对数组索引进行观察
// 2. 不能对数组长度进行观察

// 对象
// 不能检测对象的新增或删除
//

// 数组
// 1. 当用索引直接设置数组的某一项时
// 2. 当你编辑数组的长度的时候
