class MyPromise {
  state = 'pending';
  value = undefined;
  caches = [{}];

  constructor (executor) {
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve (result) {
    this.change(result, 'resolved');
  }

  reject (reason) {
    this.change(reason, 'rejected');
  }

  change (value, state) {
    // Promise的状态一旦更改就不会再改变
    if (this.state !== 'pending') {return;}
    this.value = value;
    this.state = state;
    setTimeout(() => {
      this.caches.forEach((item) => {
        if (typeof item[state] === 'function') {
          this.value = item[state].call(this, this.value);
        }
      });
    }, 0);
  }

  then (resolve, reject) {
    this.caches.push({ resolved: resolve, rejected: reject });
    return this;
  }
}

// 支持链式调用
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 1000);
})
  .then(result => console.log(result), reason => console.log(reason))
  .then((result) => {
    console.log('result', result);
  });
