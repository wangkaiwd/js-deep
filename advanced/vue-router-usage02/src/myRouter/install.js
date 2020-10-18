const install = function (Vue) {
  Vue.mixin({
    beforeCreate () {
      const router = this.$options.router;
      if (router) {
        this._routerRoot = this;
        this._router = router;
        this._router.init(this);
        // 工具方法，不考虑为公开方法的一部分 --- 避免依赖它们，除非你意识到了风险
        Vue.util.defineReactive(this, '_route', this._router.history.current);
        // 创建一个响应式对象。内部`Vue`在通过data函数返回的对象上使用这个方法。
        // 注意这个方法创建的响应式数据在重新赋值后，就不具有响应式了，可能是没有设置get,set方法？导致set时候对其进行了重新赋值，而不是触发this._data中对应属性的set方法
        // this._route = Vue.observable(this._router.history.current);
        // 这里不能使用Vue.$set方法，它只能为Vue的响应式属性添加一个新的响应式属性，目标对象不能是Vue实例，或者根data对象。即不能为this添加响应式属性，只能为this中的某个属性添加
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
        // 实例中获取router实例： this._routerRoot._router
      }
    }
  });
  Object.defineProperty(Vue.prototype, '$route', {
    get () {
      return this._routerRoot._route;
    }
  });
  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return this._routerRoot._router;
    }
  });
};
export default install;
