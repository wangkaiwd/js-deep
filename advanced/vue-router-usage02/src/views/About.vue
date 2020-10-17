<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <router-link tag="li" to="/about/a">to a</router-link>
      <router-link tag="li" to="/about/b">to b</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>
