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
    this.resolveFnList.forEach(resolveFn => {
      resolveFn(this.value);
    });
  }

  reject (reason) {
    // Promise的state和value一旦确定将不能再次修改
    if (this.status !== PENDING) return;
    this.value = reason;
    this.status = REJECTED;
    this.rejectFnList.forEach(rejectFn => {
      rejectFn(this.value);
    });
  }

  then (onFulfilled, onRejected) {
    if (this.status === RESOLVED) {
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      onRejected(this.value);
    } else {
      this.rejectFnList.push(onRejected);
      this.resolveFnList.push(onFulfilled);
    }
  }
}

module.exports = Promise;
