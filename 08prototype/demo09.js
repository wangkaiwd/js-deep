// function add (...outerArgs) {
//   let args = outerArgs;
//
//   function resultFn (...innerArgs) {
//     args = args.concat(innerArgs);
//     return args.length >= 3 ? args.reduce((a, b) => a + b) : resultFn;
//   }
//
//   // 直接执行，如果第一次执行add时参数的数量就达到了3个，会直接求和
//   return resultFn();
// }
//
// console.log(add(2)(3)(4)); // 9
// console.log(add(2, 3)(4));  // 9
// console.log(add(2, 3, 4));  // 9
// console.log(add(2)(3, 4)); // 9

// const fixCurry = (fn, totalArg) => {
//   // fn.length ： 函数形参的数量
//   const length = totalArg || fn.length;
//   let totalArgs = [];
//
//   const resultFn = (...args) => {
//     totalArgs = totalArgs.concat(args);
//     if (totalArgs.length >= length) {
//       const result = fn(...totalArgs);
//       totalArgs = [];
//       return result;
//     } else {
//       return resultFn;
//     }
//   };
//
//   return resultFn();
// };

// bind的作用：
//  1. 预先传入参数，该参数会在其绑定函数执行时放到绑定函数执行时的参数的前边
//  2. 返回一个指定this指向的函数
const fixCurry = (fn, totalArg) => {
  const length = totalArg || fn.length;
  return function resultFn (...args) {
    return args.length < length ? resultFn.bind(null, ...args) : fn(...args);
  };
};
const add = fixCurry((a, b, c) => a + b + c, 3);
console.log(add(1, 2, 3)); // 6
console.log(add(1)(2, 3)); // 6
console.log(add(1)(3)(2)); // 6
console.log(add(1, 2)(3)); // 6

const multiply = fixCurry((a, b, c) => a * b * c, 3);
console.log(multiply(1, 2, 3)); // 6
console.log(multiply(1)(2, 3)); // 6
console.log(multiply(1)(3)(2)); // 6
console.log(multiply(1, 2)(3));  // 6

