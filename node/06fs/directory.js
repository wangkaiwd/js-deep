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

function mkdirAsync (pathStr) {
  const dirs = pathStr.split('/');
  dirs.forEach((dir, i) => {
    const parentDir = dirs.slice(0, i).join('/');
    const dirPath = path.resolve(__dirname, parentDir, dir);
    // 由于是异步创建，可能存在的问题: 前一个创建还未完成，后一个创建已经开始了。
    // 而对应的创建是有先后顺序的
    fs.access(dirPath, (err) => {
      if (err) {
        fs.mkdir(dirPath, (err) => {
          if (!err) {console.log('创建成功');}
        });
      }
    });
  });
}

mkdirAsync('a/b/c/d');
