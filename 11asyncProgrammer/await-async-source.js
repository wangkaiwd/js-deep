// gen: generator function
// key: 'next'
// arg: arguments   {arg: myFunc arguments}
function asyncGeneratorStep (gen, resolve, reject, _next, _throw, key, arg) { // arg: 1. undefined 2. Promise.resolve(one)的value 1
  try {
    // 第一次执行时参数不会生效
    var info = gen[key](arg); // iterator.next(arg) // arg参数会作为代替暂停位置的yield表达式
    var value = info.value; // value = iterator.value
  } catch (error) {
    reject(error);
    return;
  }
  // 如果generator执行完必done:true
  if (info.done) { // 完成后执行resolve, generator中返回的Promise会被resolve
    resolve(value);
  } else {
    // 通过Promise.resolve将不是Promise的值转换为Promise
    // 将value作为参数，在当前微任务队列中调用_next
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator (fn) { // fn iterator function
  return function () {
    var self = this, args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next (value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value); }

      function _throw (err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err); }

      _next(undefined);
    });
  };
}

const one = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
};

function myFunc () {
  return _myFunc.apply(this, arguments);
}

// generator 返回值会作为最后的value
function _myFunc () {
  _myFunc = _asyncToGenerator(function * () {
    console.log('In function!'); // 2
    // {value: Promise, done: false}
    // Promise.resolve(value).then(_next)
    // Promise 执行完成之后，iterator.next(1)执行，才会真正执行res = 1, console.log(res)
    const res = yield one();
    // next(1),此时执行完所有代码
    console.log(res); // 4
  });
  return _myFunc.apply(this, arguments);
}

console.log('before function'); // 1

myFunc();
console.log('after function'); // 3
