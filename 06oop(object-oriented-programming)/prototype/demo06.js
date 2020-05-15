function Foo () {
  // 执行的时候会覆盖全局变量
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName () {
  console.log(5);
}
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // new不带参数，优先级低于.    2
new Foo().getName(); // new带参数，优先级和.相同，从左向右执行 3
new new Foo().getName(); // 3
