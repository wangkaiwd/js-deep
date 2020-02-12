export const timerBasic = (cb) => {
  setTimeout(() => {
    cb();
  }, 3000);
};

export const timerPending = (cb) => {
  setTimeout(() => {
    cb();
    setTimeout(() => {
      cb();
    }, 4000);
  }, 3000);
};

export const timerAdvanceByTime = (cb) => {
  setTimeout(() => {
    cb();
    setTimeout(() => {
      timerAdvanceByTime(cb);
    }, 8000);
  }, 3000);
};
