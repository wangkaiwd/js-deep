// https://promisesaplus.com/
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class Promise {
  constructor (executor) {
    this.status = PENDING;
    this.value = undefined;
    this.rejectFnList = [];
    this.resolveFnList = [];

    const resolve = this.resolve.bind(this);
    const reject = this.reject.bind(this);
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e.message);
    }
  }

  resolve (result) {
    if (this.status !== PENDING) return;
    this.value = result;
    this.status = RESOLVED;
    setTimeout(() => {
      this.resolveFnList.forEach(resolveFn => {
        resolveFn.call(undefined, this.value);
      });
    });
  }

  reject (reason) {
    // Promise的state和value一旦确定将不能再次修改
    if (this.status !== PENDING) return;
    this.value = reason;
    this.status = REJECTED;
    setTimeout(() => {
      this.rejectFnList.forEach(rejectFn => {
        rejectFn.call(undefined, this.value);
      });
    });
  }

  then (onFulfilled, onRejected) {
    this.rejectFnList.push(onRejected);
    this.resolveFnList.push(onFulfilled);
  }
}

module.exports = Promise;
