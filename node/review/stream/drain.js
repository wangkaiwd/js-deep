// 写入10个数，每次写入2个
const fs = require('fs');
const path = require('path');
const absPath = (...dir) => path.resolve(__dirname, ...dir);
const ws = fs.createWriteStream(absPath('name1.txt'), { highWaterMark: 2 });

let index = 0;
let flag = true;

function write () {
  while (index < 10 && flag) {
    flag = ws.write(index++ + '');
  }
}

write();

// 如果调用stream.write()返回false, 当合适恢复向流中写入数据的时候，drain事件将会被触发
ws.on('drain', () => {
  flag = true;
  write();
});
