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

rmdirAsync('a', () => {
  console.log('delete success');
});

// 并行删除
