const install = function (Vue) {
  Vue.mixin({
    beforeCreate () {
      const router = this.$options.router;
      if (router) {
        this._routerRoot = this;
        this._router = router;
        this._router.init(this);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
        // 实例中获取router实例： this._routerRoot._router
      }
    }
  });
};
export default install;
