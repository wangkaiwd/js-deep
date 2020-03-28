const fn = function () {
  console.log(this);
};

const obj = {
  name: 'OBJ',
  fn,
};

fn();

obj.fn();

// hasOwnProperty: 用来检测某个属性名是否属于当前对象的私有属性
// in: 检测某个属性是否属于某个对象(不论私有还是共有)
console.log(obj.hasOwnProperty('name'));
console.log(obj.__proto__.hasOwnProperty('name'));
console.log(Object.prototype.hasOwnProperty.call(obj, 'name'));

// 箭头函数和普通函数的区别：
// 1. 没有自身this,要从它的父级上下文中进行获取
// 2. 没有prototype属性(也就是没有`constructor`构造器)，所以不能被 new 运行
// 3. 没有arguments实参集合(可以基于...args剩余运算符获取)
