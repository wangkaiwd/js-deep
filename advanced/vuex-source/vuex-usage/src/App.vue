<template>
  <div id="app">
    <h2>
      root年龄{{$store.state.age}}
    </h2>
    <h3>
      <!--      a姓名{{$store.state.a.name}}-->
    </h3>
    <h3>
      <!--      b姓名{{$store.state.b.name}}-->
    </h3>
    <button @click="onAsyncAdd">async add</button>
    <button @click="onAdd">add</button>
    姓名{{$store.getters.personName}}
    {{age}}
    {{personName}}
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from './store/my-vuex';

  export default {
    name: 'App',
    components: {},
    computed: {
      ...mapState(['age']),
      // age () { // 辅助函数是这种方式的简写
      //   return this.$store.state.age;
      // }
      ...mapGetters(['personName'])
    },
    data () {
      return {};
    },
    mounted () {
      // console.log('this.$store', this.$store);
    },
    methods: {
      ...mapMutations({ a: 'syncChange' }),
      onAsyncAdd () {
        this.$store.dispatch('asyncChange', 10);
      },
      onAdd () {
        // 没有设置命名空间将会继承父命名空间
        // 1. inherits the namespace from parent module
        // 2. further nest the namespace
        // this.$store.commit('syncChange', 10);
        this.a(10);
      }
    }
  };
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
