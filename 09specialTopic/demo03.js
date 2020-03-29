// 实现call/apply/bind

const obj = {
  name: 'wk',
};

function fn (x) {
  console.log(this, x);
}

// es6
Function.prototype.myOwnCall = function (context, ...args) {
  if (context !== '' && context !== 0 && !context) {
    context = window;
  }
  // 如果传入的值为原始值，会转换为其包装对象
  context.$fn = this;
  // 函数在执行的时候是有$fn的，$fn是在之后被删除的
  // 改变了context的堆中的内容
  const result = context.$fn(...args);
  delete context.$fn;
  return result;
};

Function.prototype.myOwnApply = function (context) {
  if (context !== '' && context !== 0 && !context) {
    context = window;
  }
  const args = Array.prototype.slice.call(arguments, 1);
  // 假设context为对象
  context.$fn = this;
  const result = context.$fn(args[0]);
  delete context.$fn;
  return result;
};

fn.myOwnCall(obj, 1);
fn.myOwnApply(obj, [1]);
