const fs = require('fs');
const path = require('path');

// a a/b a/b/c
// so difficult to think
function rmdirAsync (p, cb) {
  fs.stat(p, (err, stats) => {
    if (stats.isDirectory()) {
      fs.readdir(p, (err, files) => {
        const fullFiles = files.map(file => path.resolve(p, file));
        // a/b
        // let index = 0;

        function next (index = 0) {
          // index = 0; fullFiles.length = 1
          if (index === fullFiles.length) {
            // a/b , cb 是什么时候的cb? 目录为a的时候
            return fs.rmdir(p, cb);
          }

          const fullFile = fullFiles[index++];
          // a/b
          rmdirAsync(fullFile, () => next(index));
        }

        next();
      });
    } else {
      fs.unlink(p, (err) => {
        if (err) {
          console.log('err', err);
        }
        cb();
      });
    }
  });
}

// rmdirAsync('a', () => {
//   console.log('delete success');
// });

// 异步并行删除
function rmdirAsync1 (p, cb) {
  fs.stat(p, (err, stats) => {
    if (stats.isDirectory()) {
      fs.readdir(p, (err, files) => {
        let index = 0;
        if (files.length === 0) {
          return fs.rmdir(p, cb);
        }

        function done () {
          index++;
          if (index === files.length) {
            fs.rmdir(p, cb);
          }
        }

        const fullFiles = files.map(file => path.resolve(p, file));
        for (let i = 0; i < fullFiles.length; i++) {
          const fullFile = fullFiles[i];
          rmdirAsync1(fullFile, done);
        }
      });
    } else {
      fs.unlink(p, cb);
    }
  });
}

rmdirAsync1('a', () => {
  console.log('删除成功');
});
