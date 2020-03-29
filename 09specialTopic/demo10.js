// 本质上相当于寄生组合式继承
class A {
  constructor () {
    this.x = 100;
  }

  getX () {
    console.log(this.x);
  }
}

class B extends A {
  constructor () {
    super(); // 相当于 A.call(this),将私有属性继承过来
    this.y = 200;
  }

  getY () {
    console.log(this.y);
  }
}

