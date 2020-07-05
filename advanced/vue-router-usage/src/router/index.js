import Vue from 'vue';
import VueRouter from '../vue-router';
// import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About';

// Vue.use会在install方法中做以下俩件事：
//  1. $route: 路由的相关属性
//  2. $router：路由的相关方法
// 提供了2个全局组件Vue.component()：
//  1. router-view
//  2. router-link
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  {
    path: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    children: [
      {
        path: 'a',
        component: { render (h) {return h('h4', 'this is About/a');} }
      },
      {
        path: 'b',
        component: {
          render (h) {return h('h4', 'this is About/b');}
        }
      }
    ]
  }
];

// 自身拥有install方法的类：
// 在JavaScript中的对象比较灵活，函数也可以有自己的属性，class本质上也是函数
// VueRouter在实例化的时候将routes配置项作为参数进行传入
const router = new VueRouter({ routes });

export default router;
router.beforeEach((to, from, next) => {
  console.log(1);
  next();
});
router.beforeEach((to, from, next) => {
  console.log(2);
  next();
});
