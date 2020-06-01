// 用es5模拟es6的类
//  1. 判断当前调用方式是不是通过new

const defineProperty = (Constructor, protoProperties) => {
  for (let i = 0; i < protoProperties.length; i++) {
    const protoProperty = protoProperties[i];
    // 这里是es5的类的写法，原型上的方法时暴露出来的。可枚举表示为false
    Constructor.prototype[protoProperty.key] = protoProperty.value;
    // 这里通过Object.defineProperty来为构造函数的原型来添加属性，是为了配置属性描述符？(不可枚举)
    // 在浏览器中可以看到，在node中执行无法看到原型上的属性？
    // https://stackoverflow.com/a/17893752
    Object.defineProperty(Constructor.prototype, protoProperty.key, {
      configurable: true,
      enumerable: false, // 不可枚举(在迭代遍历的时候会从对象中忽略)
      value: protoProperty.value
    });
  }
};
const Animal = (function () {
  function Animal () {
    if (!(this instanceof Animal)) {
      throw Error('constructor function must called with new keyword');
    }
    this.name = 'Panda';
  }

  defineProperty(Animal, [
    {
      key: 'say',
      value: function () {
        console.log('say');
      }
    }
  ]);
  return Animal;
})();
// 类必须使用new来调用
// Animal();
const animal = new Animal();
animal.say();
console.log('animal', Animal.prototype);
