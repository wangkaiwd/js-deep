<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/about/a">a</router-link>
    <br>
    <router-link to="/about/b">b</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    mounted () {
      console.log('this', this);
    }
  };
</script>
