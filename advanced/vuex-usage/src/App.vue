<template>
  <div id="app">
    年龄{{$store.state.age}}
    <!--    <button @click="onAsyncAdd">async add</button>-->
    <!--    <button @click="onAdd">add</button>-->
    <button @click="$store.state.age = 100">click</button>
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
      console.log('store', this);
    },
    methods: {
      onAsyncAdd () {
        // this.$store.dispatch('asyncChange', 10);
      },
      onAdd () {
        // this.$store.commit('syncChange', 10);
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
