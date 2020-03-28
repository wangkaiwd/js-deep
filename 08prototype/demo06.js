function Foo () {
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
Foo().getName(); // 4
getName(); // 4
new Foo.getName(); // 1
new Foo().getName(); // 1
new new Foo().getName();
