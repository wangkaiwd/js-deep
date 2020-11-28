import { mergeOptions } from '../util';

function initExtend (Vue) {
  let cid = 0;
  Vue.extend = function (extendOptions) {
    const Super = this;
    // Vue实例自身的属性都是在之后的逻辑中添加的
    const Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.cid = cid++;
    // 创建一个新对象，该对象的原型为Super.prototype
    Sub.prototype = Object.create(Super.prototype);
    // 更正constructor的指向
    Sub.prototype.constructor = Sub;
    // 将父类和子类的选项进行合并，初始化子组件的时候会将子组件的选项vm.$options = mergeOptions(Sub.options,options)
    Sub.options = mergeOptions(Super.options, extendOptions);
    // component,mixin,directive都会进行处理
    return Sub;
  };
}

export default initExtend;
