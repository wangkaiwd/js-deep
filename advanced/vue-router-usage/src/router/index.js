import Vue from 'vue';
// import VueRouter from '../vue-router';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Clothing from '../views/clothing';
// Vue.use会在install方法中做以下俩件事：
//  1. $route: 路由的相关属性
//  2. $router：路由的相关方法
// 提供了2个全局组件Vue.component()：
//  1. router-view
//  2. router-link
Vue.use(VueRouter);

const routes = [
  {
    path: '/clothing', name: 'clothing', component: () => import('../views/clothing'),
    children: [
      {
        path: 'men-wear',
        name: 'men-wear',
        component: () => import('../views/men-wear'),
        children: [
          {
            path: 'shirt',
            name: 'shirt',
            component: () => import('../views/shirt')
          }
        ]
      },
      {
        path: 'women-wear',
        name: 'women-wear',
        component: () => import('../views/women-wear'),
        children: [
          {
            path: 'skirt',
            name: 'skirt',
            component: () => import('../views/skirt')
          }
        ]
      }
    ]
  },
  {
    path: '/liquor',
    name: 'liquor',
    component: () => import('../views/liquor')
  },
  {
    path: '/medicine',
    name: 'medicine',
    component: () => import('../views/medicine')
  }
];

// 自身拥有install方法的类：
// 在JavaScript中的对象比较灵活，函数也可以有自己的属性，class本质上也是函数
// VueRouter在实例化的时候将routes配置项作为参数进行传入
const router = new VueRouter({ routes });

export default router;
