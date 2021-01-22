const cbs = [];

function beforeEach (cb) {
  cbs.push(cb);
}

// 用户控制函数的继续执行
function run () {
  // for循环会一次性执行完毕，不能通过用户调用next来控制
  function step (index) {
    if (cbs.length === index) {
      console.log('done');
      return;
    }
    const hook = cbs[index];
    hook('to', 'from', () => { // 用户执行next的时候进行递归
      step(index + 1);
    });
  }

  step(0);
}

beforeEach((a, b, next) => {
  console.log(1);
  next();
});

beforeEach((a, b, next) => {
  console.log(2);
  next();
});

run();
