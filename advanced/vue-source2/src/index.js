import Vue from 'vue';

const vm = new Vue({
  el: 'root',
  data () {
    return {
      msg: 'hello vue'
    };
  }
});
console.log('vm', vm);
