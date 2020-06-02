// 用es5模拟es6的类
//  1. 判断当前调用方式是不是通过new
//  2. 原型上的方法不可枚举
//  3. 构造函数上的属性不可枚举

// Object.defineProperty()
// 相比于为对象的属性直接赋值，该api可以通过传入descriptor来定义或修改属性描述符
// 该方法允许精确地添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，在枚举对象属性时会被枚举到
// const o = {};
// o.a = 1;
// 等同于
// Object.defineProperty(o, o.a, {
//   value: 1,
//   writable: true,
//   configurable: true,
//   enumerable: true,
// });

function define (target, properties) {
  for (let i = 0; i < properties.length; i++) {
    const protoProperty = properties[i];
    // 这里是es5的类的写法，原型上的方法时暴露出来的。可枚举表示为false
    target.prototype[protoProperty.key] = protoProperty.value;
    // 这里通过Object.defineProperty来为构造函数的原型来添加属性，是为了配置属性描述符中的的enumerable为false
    // 在浏览器中可以看到，在node中执行无法显示不可枚举属性？
    // https://stackoverflow.com/a/17893752
    Object.defineProperty(target.prototype, protoProperty.key, {
      configurable: true, // 表示对象的属性是否可以被删除，以及出value和writable特性外的其它特性是否可以被修改
      enumerable: false, // 不可枚举(在迭代遍历的时候会从对象中忽略)。定义了对象的属性是否可以在`for...in`和`Object.keys()`中出现
      value: protoProperty.value
    });
  }
}

const defineProperty = (Constructor, protoProperties, staticProperties) => {
  if (Array.isArray(protoProperties)) { // 原型属性
    define(Constructor.prototype, protoProperties);
  }
  if (Array.isArray(staticProperties)) { // 静态属性
    define(Constructor, staticProperties);
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
    ],
    [ // 类上的属性或方法
      {
        key: 'a',
        value: function () {
          console.log('a');
        }
      }
    ]);
  return Animal;
})();
// 类必须使用new来调用
// Animal();
const animal = new Animal();
animal.say();
console.log('animal', Animal);
