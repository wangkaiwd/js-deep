const fs = require('fs');
const path = require('path');

// a a/b a/b/c
// so difficult to think
function rmdirAsync (p, cb) {
  fs.stat(p, (err, stats) => {
    if (stats.isDirectory()) {
      fs.readdir(p, (err, files) => {
        const fullFiles = files.map(file => path.resolve(p, file));
        let index = 0;

        function next () {
          if (index === fullFiles.length) {
            return fs.rmdir(p, cb);
          }
          const fullFile = fullFiles[index++];
          rmdirAsync(fullFile, next);
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
