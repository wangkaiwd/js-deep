function initExtend (Vue) {
  Vue.extend = function () {
    const Super = this;
    // Vue实例自身的属性都是在之后的逻辑中添加的
    const Sub = function SubComponent () {
      this._init();
    };
    // 创建一个新对象，该对象的原型为Super.prototype
    Sub.prototype = Object.create(Super.prototype);
    // 更正constructor的指向
    Sub.prototype.constructor = Sub;
    return Sub;
  };
}

export default initExtend;
