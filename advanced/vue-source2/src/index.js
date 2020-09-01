import Vue from 'vue';
import asyncUpdateTest from './async-update-demo';
import dependenceCollectionArray from './dependency-collection-demo';

const vm = new Vue({
  el: '#app',
  // The object must be plain: native objects such as browser API objects and prototype properties are ignored
  data () {
    return {
      arr: [1, 2, 3]
    };
  }
});

// asyncUpdateTest(vm);
console.log('vm', vm);
dependenceCollectionArray(vm);
