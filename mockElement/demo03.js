export const timer = (cb) => {
  setTimeout(() => {
    cb();
  }, 3000);
};
