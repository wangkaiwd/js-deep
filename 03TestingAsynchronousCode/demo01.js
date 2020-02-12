export const testCallback = (cb) => {
  setTimeout(() => {
    cb('peanut butter');
  }, 2000);
};
export const testPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('peanut butter');
    }, 3000);
  });
};

export const testPromiseError = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error');
    }, 3000);
  });
};
