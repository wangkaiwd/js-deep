// https://promisesaplus.com/
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class Promise {
  constructor (executor) {
    this.status = PENDING;
    this.value = undefined;
    const resolve = (result) => {
      this.value = result;
    };
    const reject = (reason) => {
      this.value = reason;
    };
    executor(resolve, reject);
  }

  then (onFulfilled, onRejected) {

  }
}

