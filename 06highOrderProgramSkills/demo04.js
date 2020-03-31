const fn1 = (x) => {
  return x + 10;
};

const fn2 = (x) => {
  return x * 10;
};
const fn3 = (x) => {
  return x / 10;
};

// 实现compose函数，能够通过compose(fn1,fn2,fn3)(5)来实现如下调用
// fn3(fn2(fn1(5)))

// 函数参数扁平化
const compose = (...functions) => {
  return (...args) => {
    if (functions.length === 0) return args;
    // 注意：reverse 会更改原数组
    return functions.reverse().reduce((accumulator, item, index) => {
      // 后一次的返回值会作为前一次的执行结果
      return item(index === 1 ? accumulator(...args) : accumulator);
    });
  };
};
console.log(compose(fn1, fn2, fn1, fn3)(5));
