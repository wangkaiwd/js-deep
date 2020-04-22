// add(2)(3)
// function add (x) {
//   return function (y) {
//     return x + y
//   }
// }

// const add = (x) => (y) => x + y

// 传参个数不确定

// 1. make use of valueOf property
// const add = function (x) {
//   let sum = x
//
//   function result (y) {
//     sum = sum + y
//     return result
//   }
//
//   // 直接赋值存在的问题：会直接的到初始值，之后即使sum的值发生改变，result.valueOf的值也不会更新
//   // 解决方法：
//   // 1. 赋值为对象，来改变对象中的键值对，之后通过对象来获取键值对内容
//   // 2. 赋值为函数，函数会在每次执行时都开辟一个执行上下文，并通过作用域链来进行变量查找，找到的都是最新的sum值
//   // result.valueOf = sum
//   result.valueOf = function () {
//     return sum
//   }
//   return result
// }
//
// // 下边的`+`和`==` 会将add执行结果强制转换为number,这里会首先调用valueOf方法
// console.log(5 + add(2)(3)) // true
// console.log(add(2)(3)(4) == 9) // true
// console.log(add(3)(4)(5).valueOf()) // 9

// 2. Explicit call to a property

// function add (x) {
//   let sum = x;
//   function resultFn (y) {
//     sum += y;
//     // 通过函数的属性来记录求和后的值
//     resultFn.result = sum;
//     return resultFn;
//   }
//   // f.result = () => sum;
//   return resultFn;
// }
//
// console.log(add(3)(4)(5).result); // 12
// const t = add(3)(4);
// console.log(t.result); // 7
// console.log(t(5).result); //12

// 3. Explicit call to function with no arguments for final result

function add (x) {
  if (!x) return;
  let sum = x;
  return function resultFn (y) {
    const length = arguments.length;
    if (length === 0) {
      return sum;
    }
    sum += y;
    return resultFn;
  };
}

console.log(add(2)(3)()); // 5
const t = add(3)(4)(5);
console.log(t()); // 12




