class MyPromise {
  state = 'pending';
  value = undefined;
  caches = [{}];

  constructor (executor) {
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve (result) {
    this.value = result;
    this.state = 'resolved';
    setTimeout(() => {
      this.caches.forEach(({ resolve }) => {
        if (typeof resolve === 'function') {
          const xxx = resolve.call(this, this.value);
          this.value = xxx;
        }
      });
    }, 0);
  }

  reject (reason) {
    this.value = reason;
    this.state = 'rejected';
    setTimeout(() => {
      this.caches.forEach(({ reject }) => {
        if (typeof reject === 'function') {
          const xxx = reject.call(this, this.value);
          this.value = xxx;
        }
      });
    }, 0);
  }

  then (resolve, reject) {
    this.caches.push({ resolve, reject });
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
