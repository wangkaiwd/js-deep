// 编写一个add函数满足如下需求
// add(1);        //1
// add(1)(2);     //3
// add(1)(2)(3);  //6
// add(1)(2, 3);  //6
// add(1, 2)(3);  //6
// add(1, 2, 3);  //6

const curry = (fn) => {
  return function curried (...argsOuter) {
    // 实参的个数大于等于被柯理化函数的个数，会直接直接执行函数
    // 这里由于用到了fn.length,所以fn的参数个数要确定，不能使用...rest参数
    if (argsOuter.length >= fn.length) {
      return fn(...argsOuter);
    }
    return function (...argsInner) {
      return curried(...argsOuter.concat(argsInner));
    };
  };
};

const sum = function (a, b, c) {
  return a + b + c;
};

const add = curry(sum);
console.log(add(1)(2)(3)); // 6
