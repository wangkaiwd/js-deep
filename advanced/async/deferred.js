const fs = require('fs');
const read = (...args) => {
  // 通过延迟对象来解决Promise的嵌套问题
  // return new Promise((resolve, reject) => {
  //   fs.readFile(...args, (err, data) => {
  //     if (err) return reject(err);
  //     resolve(data);
  //   });
  // });
  const deferred = Promise.deferred();
  fs.readFile(...args, (err, data) => {
    if (err) return deferred.reject(err);
    deferred.resolve(data);
  });
  return deferred.promise;
};

read('./a.txt', 'utf8').then((data) => {
  console.log('data', data);
});
