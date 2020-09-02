import Vue from 'vue';
import asyncUpdateTest from './async-update-demo';
import dependenceCollectionArray from './dependency-collection-demo';

const vm = new Vue({
  el: '#app',
  // The object must be plain: native objects such as browser API objects and prototype properties are ignored
  data () {
    return {
      arr: [[1], 2, 3],
      msg: 'hello'
    };
  },
  watch: {
    // msg (newVal, oldVal) {
    //   console.log('val', newVal, oldVal);
    // }
    msg: {
      handler (newVal, oldVal) {
        console.log('watch val', newVal, oldVal);
      },
      immediate: true
    }
  }
});

// asyncUpdateTest(vm);
// console.log('vm', vm);
// dependenceCollectionArray(vm);
vm.msg = 'world';
