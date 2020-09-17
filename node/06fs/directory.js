const fs = require('fs');
const path = require('path');

// make directory must has parent directory
// node 12 support recursive options
function mkdirSync (pathStr) {
  const dirs = pathStr.split('/');
  dirs.forEach((dir, i) => {
    const parentDir = dirs.slice(0, i).join('/');
    const dirPath = path.resolve(__dirname, parentDir, dir);
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
function mkdirAsync (pathStr) {
  const dirs = pathStr.split('/');

  function next (index = 0) {
    const parentDir = dirs.slice(0, index).join('/');
    const dirPath = path.resolve(__dirname, parentDir, dirs[index]);
    const mkdir = (dir) => {
      fs.mkdir(dir, (err) => {
        if (!err) {
          console.log('创建成功');
          if (index < dirs.length - 1) {
            next(++index);
          }
        }
      });
    };
    fs.access(dirPath, (err) => {
      if (err) {
        mkdir(dirPath);
      } else { // 已经存在直接进行下一次创建
        if (index < dirs.length - 1) {
          next(++index);
        }
      }
    });
  }

  next();
}

mkdirAsync('a/b/c/d');
