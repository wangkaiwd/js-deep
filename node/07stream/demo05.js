// 10个数写入到文件中 依次写入：
//  1. 直接用10字节的内存来写入
//  2. 写完一个再写下一个
const fs = require('fs');
const path = require('path');

const ws = fs.createWriteStream(path.resolve(__dirname, 'name.txt'), {
  highWaterMark: 1
});
let index = 0;
while (index < 10) {
  // 第一个向文件中写入，剩下的内容在内存中排队
  // 不在对象模式中操作的流，参数一定是string,buffer或Unit8Array
  ws.write(index + '');
  // 这里要转换成字符传才能调用write方法
  index++;
}
ws.end();
