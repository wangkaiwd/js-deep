<template>
  <div id="app">
    <router-link :to="{name: 'clothing'}">服装</router-link>
    <br>
    <router-link :to="{name: 'men-wear'}">男装</router-link>
    -
    <router-link :to="{name: 'shirt'}">衬衫</router-link>
    <br>
    <router-link :to="{name: 'women-wear'}">女装</router-link>
    -
    <router-link :to="{name: 'skirt'}">裙子</router-link>
    <br>
    <router-link :to="{name: 'liquor'}">酒类</router-link>
    <br>
    <router-link :to="{name: 'medicine'}">药类</router-link>
    <router-view/>
  </div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
