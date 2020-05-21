class Animal {
  constructor (name) {
    this.name = name;
    // 类的实例化监测
    if (new.target === Animal) { // 类为抽象类，只能继承，不能进行实例化
      throw new Error('not new');
    }
  }

  static a () {
    return 100;
  }

  say () {
    console.log('say');
  }
}

class Tiger extends Animal {
  constructor (name) {
    super(name); // Animal.call(this)
  }

  say2 () {
    // 原型方法中，super是父类的原型
    // Animal.prototype
    super.say();
  }

  static b () { // 静态方法中的super方法指向的是父类
    return super.a();
  }
}

// 原理：call + Object.create + __proto__
const tiger = new Tiger('hhh');
tiger.say();
console.log(tiger.name);
console.log(Tiger.a()); // 继承静态方法
console.log(Tiger.b());
tiger.say2();
