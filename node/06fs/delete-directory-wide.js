const fs = require('fs');
const path = require('path');

// 将所有目录或文件按照由父到子的顺序放到一个数组中，然后倒着将数组的每一项进行删除
// 广度优先
function rmdirSync (p) {
  const array = [];

  function iterate (p) {
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      array.push(p);
      const dirs = fs.readdirSync(p);
      dirs.forEach(dir => {
        const fullDir = path.resolve(p, dir);
        iterate(fullDir);
      });
    } else {
      array.push(p);
    }
  }

  iterate(p);
  for (let i = array.length - 1; i >= 0; i--) {
    const item = array[i];
    const stat = fs.statSync(item);
    if (stat.isDirectory()) {
      fs.rmdirSync(item);
    } else {
      fs.unlinkSync(item);
    }
  }
  console.log('删除成功');
}

rmdirSync('f');
