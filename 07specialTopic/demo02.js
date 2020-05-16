// 1. 普通函数执行
// const fn = function () {
//   console.log(this);
// };
//
// const obj = { name: 'OBJ', fn };
//
// fn();
//
// obj.fn();
//
// const fn1 = obj.fn;
// fn1();

// hasOwnProperty: 用来检测某个属性名是否属于当前对象的私有属性
// in: 检测某个属性是否属于某个对象(不论私有还是共有)
// console.log(obj.hasOwnProperty('name'));
// console.log(obj.__proto__.hasOwnProperty('name'));
// console.log(Object.prototype.hasOwnProperty.call(obj, 'name'));

// 箭头函数和普通函数的区别：
// 1. 没有自身this,要从它的父级上下文中进行获取
// 2. 没有prototype属性(也就是没有`constructor`构造器)，所以不能被 new 运行
// 3. 没有arguments实参集合(可以基于...args剩余运算符获取)

// 2. 事件绑定
// 假设页面中有id为button的button元素
// var x = 100;
// window.x = 100;
// const fn = function () {
//   console.log(this.x);
// };
// const obj = { x: 200, fn };
// const $button = document.getElementById('button');
// $button.x = 300;
//
// obj.fn();
// const fn1 = obj.fn;
// fn1();
//
// $button.addEventListener('click', fn);
// $button.addEventListener('mouseenter', obj.fn);
//
// $button.addEventListener('mouseleave', function () {obj.fn();});

// 3. 构造函数
// var x = 100;
// const Fn = function () {
//   this.x = 200;
//   console.log(this.x);
// };
//
// const fn = new Fn();

// 4. 箭头函数
// const fn = function () {
//   console.log(this);
//   setTimeout(() => {
//     console.log(this);
//   }, 1000);
//   setTimeout(function () {
//     console.log(this);
//   });
// };
//
// const obj = { x: 100, fn };
//
// obj.fn();

// 5. call/apply/bind
var x = 100;
const obj = { x: 200, y: 200 };
const fn = function () {
  console.log(this.x);
};

fn();
fn.call(obj);
fn.apply(obj);

const fixedThisFn = fn.bind(obj);
fixedThisFn();
