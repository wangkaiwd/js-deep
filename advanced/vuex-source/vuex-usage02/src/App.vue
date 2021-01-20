<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <h3>a:{{ a }}</h3>
    <h3>c:{{ c }}</h3>
    <button @click="addA">addA</button>
    <button @click="addC">addC</button>
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {};
  },
  mounted () {
    // 将Vue的实例放到了$store属性上
    console.log(this.$store);
  },
  computed: {
    a () {
      return this.$store.state.a;
    },
    c () {
      return this.$store.state.b.c;
    }
  },
  methods: {
    addA () {
      this.$store.commit('addA');
    },
    addC () {
      this.$store.commit('addC');
    }
  }
};
</script>
