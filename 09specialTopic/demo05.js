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
// 由于可以改动原型链的动向，所以基于instanceof检测出来的结果可能并不是准确的

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
