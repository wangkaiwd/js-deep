export const install = (Vue) => {
  Vue.mixin({
    beforeCreate () { // 实例初始化后立即同步调用，在数据监测和事件watcher设置之前
      // 在根实例中传入了router选项，而router选项是VueRouter的实例
      if (this.$options.router) {
        this._routerRoot = this;
        this._router = this.$options.router;
        // 初始化路由 this.$options.router是VueRouter的实例
        // 这里调用VueRouter实例的init方法
        this._router.init(this);
        // 将current属性定义成响应式的，保证current更新会使视图一起更新
        // 将current赋值为this._route,并具有响应式
        // 这样在更改路径的时候，this._route并不会更新，
        // 因为在路径变化时，current指向的新的堆内存地址，而此时this._route指向的还是旧的地址，并不是同一块堆内存
        // 所以需要在current重新赋值后，再更新_route属性
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
        // 组件获取根实例中传入的router
        // this._routerRoot._router
      }
    }
  });
  // 为Vue原型增加$route和$router属性
  Object.defineProperty(Vue.prototype, '$route', {
    get () { // 这里的this是Vue实例，应为是通过实例来调用$route,以及$router属性
      return this._routerRoot._route;
    }
  });
  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return this._routerRoot._router;
    }
  });
};
