const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, 'a.txt'), (err, data) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('读取成功');
    // 如果文件已经存在的话，替换文件
    // default flag: w
    fs.writeFile(path.resolve(__dirname, 'b.txt'), data, { flag: 'a' }, (err) => {
      if (err) {
        console.log('err', err);
      } else {
        console.log('写入成功');
      }
    });

    // default flag: a
    // fs.appendFile(path.resolve(__dirname, 'b.txt'), data, (err) => {
    //   if (err) {
    //     console.log('err', err);
    //   } else {
    //     console.log('写入成功');
    //   }
    // });

  }
});
