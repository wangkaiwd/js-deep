export const install = (Vue) => {
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        this._routerRoot = this;
        this._router = this.$options.router;
        // 初始化路由 this.$options.router是VueRouter的实例
        this._router.init(this);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
        // 组件获取根实例中传入的router
        // this._routerRoot._router
      }
    }
  });
};
