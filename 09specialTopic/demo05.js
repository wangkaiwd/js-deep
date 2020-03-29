// typeof
// 局限性：
//  1. typeof null => "object"  null不是空对象，它是空对象指针
//  2. 无法基于typeof判断数据object类型的的具体类型，如日期、正则、数组等

// typeof返回结果都是字符串: 检测某个实例是否属于某个类
console.log(typeof []); // "object"
console.log(typeof typeof []); // "string"

// instanceof：
//  1. 检测某个实例是否属于某个类
//  2. 所有出现在其原型链上的类，检测结果都是true
// 局限性：
// 1. 由于可以改动原型链的动向，所以基于instanceof检测出来的结果可能并不是准确的
// 2. 由于简单数据类型并不是对象，所以不会有__proto__等原型链机制，所以无法使用instanceof进行检测

console.log([] instanceof Array); // true
console.log([] instanceof Object); // true

function Fn () {
}

// 改变了原型链的指向,导致constructor也会发生改变
Fn.prototype.__proto__ = Array.prototype;

// 原型链指向：
// 1. fn.__proto__ => Fn.prototype
// 2. Fn.prototype.__proto__ => Object.prototype  这里被改动 Fn.prototype.__proto__ => Array.prototype
const fn = new Fn();
console.log(fn instanceof Fn); // true
console.log(fn instanceof Object); // false
console.log(fn instanceof Array); // true

// constructor: 与 instanceof 类似
//  1. constructor指向原型的所属类
// 局限性：
//  1. 当手动改变constructor或者原型链的指向的时候，会导致结果不准确
const arr = [];

console.log(arr.constructor); // Array
Array.prototype.constructor = null;

console.log(arr.constructor); // null

// Object.prototype.toString
//    Object的原型上的toString方法不是用来转换字符串的，而是返回当前所属类的信息
//    mdn: 返回一个表示该对象的字符串： "[object Type]"

// 每种数据类型基本上都有它们自己的toString方法，其实现过程都不太一样。只有对象原型上的toString方法可以获取到当前对象的类型信息
// 所以我们可以通过call来改变this指向，让其其它的数据类型元素可以调用
// 借用原型上的方法
// 这种方式可以准确的判断数据类型，即使改变原型链也不会出错

// 实际应用：
// 1. 基本数据类型首选typeof，语法简单
// 2. 不怎么严谨：instanceof/constructor  严谨：Object.prototype.toString
