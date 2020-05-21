class Animal {
  constructor (name) {
    this.name = name;
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

