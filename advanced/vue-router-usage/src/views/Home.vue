<template>
  <div class="home"><!--
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

  -->
    <!--
      1. 这里通过name来跳转route
      2. name也同样是route的权限，这里如果权限是一数组，即一个页面有多个权限该怎么办？
    -->
    <li v-for="item in authList" :key="item.auth">
      <router-link :to="{name: item.auth}">{{item.name}}</router-link>
    </li>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';

  export default {
    name: 'Home',
    computed: {
      ...mapState(['authList']),
      ...mapGetters(['hasPermission'])
    },
  };
</script>
