class MyPromise {
  state = 'pending';
  value = undefined;
  caches = {};

  constructor (executor) {
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve (result) {
    this.value = result;
    setTimeout(() => {
      const { resolve } = this.caches;
      if (typeof resolve === 'function') {
        resolve.call(this, this.value);
      }
    }, 0);
  }

  reject (reason) {
    this.value = reason;
    setTimeout(() => {
      const { reject } = this.caches;
      if (typeof reject === 'function') {
        reject.call(this, this.value);
      }
    }, 0);
  }

  then (resolve, reject) {
    this.caches = { resolve, reject };
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 1000);
}).then(result => console.log(result), reason => console.log(reason));
