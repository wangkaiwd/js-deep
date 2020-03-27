// es5中，将伪数组转换为真实数组的方法
function fn () {
  // 下边简单模拟了数组slice方法的实现，Array.prototype.slice()执行时，this指向为Array.prototype
  // 通过使用call将this指向更改为arguments,由于arguments有length属性，
  // 所以通过for循环遍历时，通过for循环的初始i值，结合arguments的length属性返回一个新的"真"数组
  return Array.prototype.slice.call(arguments, 0);
  // 当然，我们也可以直接通过实例调用并且更改this指向: [].slice.call(arguments,0)
  // []是Array的实例，所以[]的__proto__指向,Array.prototype。
  // 当执行slice方法时，首先会在[]自身上查找，并没有找到，之后会通过原型链，查找Array.prototype.slice方法，并进行调用
  // Array.prototype.slice.call(arguments,0)和[].slice.call(arguments,0)之间的区别：
  //    前者的this首先指向Array.prototype,然后更改为arguments
  //    后者的this首先指向[],然后更改为arguments
}
console.log(fn(1, 2, 3, 4, 5));

//
console.log(Array.prototype.slice.call('这是一段字符串', 0)); // ['这','是','一','段','字','符','串']

Array.prototype.mySlice = function (start, end) {
  const { length } = this;
  end = end || length;
  const result = [];
  for (let i = start; i < end; i++) {
    result[i] = this[i];
  }
  return result;
};

// [1,2,3].mySlice => 将mySlice指向 Array.prototype.mySlice所对应的函数的可索引地址，说明它们指向同一个函数
// 函数在调用时，如果未使用call/bind/apply，那么函数`.`前边是谁，this的指向就是谁

