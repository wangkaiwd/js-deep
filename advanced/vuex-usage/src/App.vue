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
    <button @click="$store.state.age = 100">click</button>
    姓名{{$store.getters.personName}}
  </div>
</template>

<script>

  export default {
    name: 'App',
    components: {},
    data () {
      return {};
    },
    mounted () {
      console.log(this.$store);
    },
    methods: {
      onAsyncAdd () {
        this.$store.dispatch('asyncChange', 10);
      },
      onAdd () {
        this.$store.commit('syncChange', 10);
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
