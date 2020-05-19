// co + generator + promise
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// 先读取文件a的结果，文件a会返回文件b的地址，然后读取文件b的内容，最终将文件b的内容进行返回
function * read () { // 暂停
  const a = yield readFile('./a.txt', 'utf8');
  const b = yield readFile(a.replace(/\s/g, ''), 'utf8');
  return b;
}

function co (iterator) {
  return new Promise((resolve, reject) => {
    // const { value, done } = iterator.next();

    // 这里用循环会同步执行，使用回调函数会异步执行
    function next (y) {
      const { value, done } = iterator.next(y);
      if (done) {
        resolve(value);
      } else {
        // 这里yield后边也可能不是Promise,是一个普通值
        Promise.resolve(value).then((y) => {
          next(y);
        }, reject);
      }
    }

    next();
  });
}

co(read()).then((result) => {
  console.log('result', result);
});
