/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for the
 * resulting composite function.
 *
 * @param funcs The functions to compose.
 * @returns A function obtained by composing the argument functions from right
 *   to left. For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */

function compose (...funcs) {
  // 如果没有执行函数传入，那么最终会将传入的第一个函数的参数返回
  if (funcs.length === 0) {return (arg) => arg;}

  // 如果传入的执行函数只有一个，将当前执行函数返回
  if (funcs.length === 1) {return funcs[0];}

  // 如果传入的执行函数有多个
  return funcs.reduce((a, b) => {
    return (...args) => { // 函数中的内容并不会立即执行
      return a(b(...args));
    };
  });
}
const fn1 = (x) => {
  return x + 10;
};

const fn2 = (x) => {
  return x * 10;
};
const fn3 = (x) => {
  return x / 10;
};

console.log(compose(fn1, fn2, fn1, fn3)(5))
