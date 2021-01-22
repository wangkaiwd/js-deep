## vue-router

### Usage

```javascript
import VueRouter from 'vue-router';
import Vue from 'vue'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash',
  routes: [
    { name: 'Home', path: '/home', component: '@/views/home' }
  ]
})

new Vue({
  // ...
  router
})
```

### Install

### 核心思路

生成：地址 -> 组件的映射表

映射表中有`matched`属性，存放所有匹配到的父级路由

最简单的`demo`

* / : 首页
* /a: a 页面
  * /a/c: c页面
* /b: b 页面


* 根据传入的`routes`生成路径映射数据
* 监听`hashchange`事件

### addRoutes

### Components

#### RouterView

#### RouterLink

### beforeEach hook
