function fun () {
  this.a = 0;
  this.b = function () {
    alert(this.a);
  };
}
// 注意：这里重置原型指向，会丢失constructor属性，需要进行手动指定
fun.prototype = {
  b: function () {
    this.a = 20;
    alert(this.a);
  },
  c: function () {
    this.a = 30;
    alert(this.a);
  },
};
var my_fun = new fun();
my_fun.b(); // 0
my_fun.c(); // 30

// 进阶问题：
console.log(my_fun.constructor);
fun.prototype.b();

// 构造函数的prototype与普通对象的区别：它本身具备一个constructor属性，指向当前类
// 所以当为prototype赋值为一个新对象的时候，一定要先手动赋值constructor属性
