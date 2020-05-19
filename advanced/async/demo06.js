const fs = require('fs');
const read = (...args) => {
  // 通过延迟函数来少些一些函数嵌套
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
