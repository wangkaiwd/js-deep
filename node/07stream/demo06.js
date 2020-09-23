const fs = require('fs');
const path = require('path');

const ws = fs.createWriteStream(path.resolve(__dirname, 'name.txt'), {
  highWaterMark: 1
});

let index = 0;
let flag = true;

function write () {
  while (index < 10 && flag) {
    flag = ws.write(index + '');
    index++;
  }
}

write();

// 当执行end方法后，监听的事件将都会被取消
// 如过一个对于steam.write(chunk)的调用返回了false, 当合适恢复向流中写入数据的时候，drain事件将会触发
ws.on('drain', () => {
  flag = true;
  write();
});

