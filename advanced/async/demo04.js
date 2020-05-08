// https://promisesaplus.com/
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class Promise {
  constructor (executor) {
    this.status = PENDING;
    const resolve = (result) => {

    };
    const reject = (reason) => {

    };
    executor(resolve, reject);
  }

  then (onFulfilled, onRejected) {

  }
}

