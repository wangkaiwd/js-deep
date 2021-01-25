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

### Core Logic

* pathMap
* 映射表中有`matched`属性，存放所有匹配到的父级路由

最简单的`demo`

* / : 首页
* /a: a 页面
  * /a/c: c页面
* /b: b 页面


* 根据传入的`routes`生成路径映射数据
* 监听`hashchange`事件

#### Reactivity

* $route: current, Vue.util.defineReactive(this,'_route',this._router.history.current)
* $router: Router instance

$router doesn't have reactivity, only provide some method with customers to call

### addRoute

How to dynamic add route options?

* add new route to pathList and pathMap, not maintain old routes
* if new route has a parent, it will appear in current matched property

### Components

vue router provide built-in components for customer

#### RouterView

* render hash matched component according to component level
* Means of $vnode property

#### RouterLink

* click element

### beforeEach hook

* call next hook by customer
