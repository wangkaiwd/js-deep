// 2.1.
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class Promise {
  constructor (executor) {
    this.state = PENDING;
    this.value = undefined; // 1.3. 任何合法的JavaScript值
    this.reason = undefined; // 1.5. 表示为什么promise被拒绝的一个值
    this.resolveFnList = [];
    this.rejectFnList = [];
    const resolve = (result) => {
      if (this.state !== PENDING) return;
      this.state = RESOLVED;
      this.value = result;
      this.resolveFnList.forEach(fn => fn.call(undefined)); // 2.2.5 调用onFulfilled时this指向为undefined
    };
    const reject = (reason) => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.reason = reason;
      this.rejectFnList.forEach(fn => fn.call(undefined)); // 2.2.5 调用onRejected时this指向为undefined
    };
    executor(resolve, reject);
  }

  then (onFulfilled, onRejected) {
    if (this.state === RESOLVED) {
      setTimeout(() => {
        onFulfilled(this.value);
      }, 0);
    } else if (this.state === REJECTED) {
      setTimeout(() => {
        onRejected(this.reason);
      }, 0);
    } else { // pending
      this.resolveFnList.push(() => {
        setTimeout(() => {
          onFulfilled(this.value);
        }, 0);
      });
      this.rejectFnList.push(() => {
        setTimeout(() => {
          onRejected(this.reason);
        }, 0);
      });
    }
  }
}

module.exports = Promise;
