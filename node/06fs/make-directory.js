const fs = require('fs');
const path = require('path');

// make directory must has parent directory
// node 12 support recursive options
function mkdirSync (pathStr) {
  const dirs = pathStr.split('/');
  dirs.forEach((dir, i) => {
    const dirStr = dirs.slice(0, i + 1).join('/');
    const dirPath = path.resolve(__dirname, dirStr);
    fs.access(dirPath, (err) => {
      if (err) {
        fs.mkdirSync(dirPath);
      }
    });
  });
}

// mkdirSync('a/b/c/d');

// 相互关联的异步循环；前一次执行完毕，才能进行下一次执行
// 而for循环会一次性直接执行完毕
function mkdirAsync (pathStr, callback) {
  const dirs = pathStr.split('/');

  function next (index = 0) {
    if (!(index < dirs.length)) {
      return callback();
    }
    const dirStr = dirs.slice(0, index + 1).join('/');
    const dirPath = path.resolve(__dirname, dirStr);
    const mkdir = (dirPath) => {
      fs.mkdir(dirPath, (err) => {
        if (!err) {next(++index);}
      });
    };
    fs.access(dirPath, (err) => {
      if (err) {mkdir(dirPath);} else { // 已经存在直接进行下一次创建
        next(++index);
      }
    });
  }

  next();
}

// callback: 创建成功后做一些事情
mkdirAsync('a/b/c/d', () => {
  console.log('创建成功');
});
