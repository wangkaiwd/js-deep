// 如何使用vue

import Vue from 'vue';

const vm = new Vue({
  el: '#app', // vue实例的挂载点。可以是一个CSS选择器字符串，也可以是一个真实的HTML元素
  data () {
    return {
      msg: 'hello',
      // person: { name: 'zs', age: 10 },
      // arr: [{ a: 1 }, 1, 2, 3],
      // f: function () {
      //   console.log(f);
      // }
      firstName: '三',
      lastName: '张'
    };
  },
  computed: {
    fullName () {
      return this.firstName + this.lastName;
    }
  },
  // watch: {
  //   // msg (newValue, oldValue) {
  //   //   console.log(newValue, oldValue);
  //   // }
  //   // 传入的key对应的值为对象
  //   msg: {
  //     handler: function (newVal, oldVal) {
  //       console.log(newVal, oldVal);
  //     },
  //     immediate: true
  //   }
  // }
});

// Vue实例对象

// 并不会触发Object.defineProperty中的set方法
// vm.arr.push(4);

// 不会被观察到的实际含义是说不会触发Object.defineProperty中的setter/getter的方法
// 如果数组中新增的内容是对象
// vm.arr[0].a = 100;
// console.log(vm.arr[1] = '1');
// 不会被观察
// vm.person.sex = '南';
// console.log(vm.msg);

// 什么样的数组会被观察：
// [ 0, 1, 2] 数组中每一项并不是对象，并不会被观察
// [0,1,2].length-- 数组长度的变化没有进行监控

// [{a:1}]  会对数组中的对象进行观察
// [].push/unshift/splice 方法可以被监控 vm.$set 内部调用的就是数组的splice方法

// 1. 不能对数组索引进行观察
// 2. 不能对数组长度进行观察

// 对象
// 不能检测对象的新增或删除
// 即对象新增和删除时不能收集对应的watcher，所以无法通知视图更新
// 视图更新是通过设置值时调用dep.notify，然后通知对应的watcher更新视图

// 数组
// 1. 当用索引直接设置数组的某一项时
// 2. 当你编辑数组的长度的时候
// 只是对数组进行了监控，没有对数组的每一项进行监控(数组的每一项的key为其索引)

// 依赖收集
// setTimeout(() => {
// 这样会调用4次set方法
// vue的特点是批量更新dom，而不是每次都进行更新
//   vm.msg = 'xxx';
//   vm.msg = 'hello1';
//   vm.msg = 'hello2';
//   vm.msg = 'hello3';
// vm.arr.push(4);
// vm.arr[0].a = 100;
// vm.arr[1] = 'x';
// vm.msg = 'world';

// watch
// vm.msg = 'xxx';

// computed
// }, 3000);
