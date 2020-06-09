class A {
  constructor () {
    this.a = 100;
  }

  getA () {
    console.log(this.a);
  }
}

A.say = function () {
  console.log('say');
};

class B extends A {
  constructor () {
    // 继承私有方法
    super();
    this.b = 200;
  }

  getB () {
    console.log(this.b);
  }
}

B.say();
