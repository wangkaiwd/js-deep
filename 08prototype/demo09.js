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

const fixCurry = (fn, totalArg) => {
  // fn.length ： 函数形参的数量
  const length = totalArg || fn.length;
  let totalArgs = [];

  const resultFn = (...args) => {
    totalArgs = totalArgs.concat(args);
    if (totalArgs.length >= length) {
      return fn(...totalArgs);
    } else {
      return resultFn;
    }
  };

  return resultFn();
};

const sum = (a, b, c) => {
  return a + b + c;
};
const fn = fixCurry(sum, 3);
console.log(fn(2, 3)(4)); // 9
