class A {
  constructor () {
    this.a = 100;
  }

  getA () {
    console.log(this.a);
  }
}

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

const b = new B();
console.log('b', b.a);
b.getA();
console.log('b', b.b);
b.getB();
