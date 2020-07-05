<template>
  <div class="home">
    <router-link :to="{name: 'clothing'}">服装</router-link>
    <router-link :to="{name: 'men-wear'}">男装</router-link>
    <router-link :to="{name: 'shirt'}">衬衫</router-link>
    <router-link :to="{name: 'women-wear'}">女装</router-link>
    <router-link :to="{name: 'skirt'}">裙子</router-link>
    <router-link :to="{name: 'liquor'}">酒类</router-link>
    <router-link :to="{name: 'medicine'}">药类</router-link>
  </div>
</template>

<script>
  export default {
    name: 'Home',
  };
</script>
