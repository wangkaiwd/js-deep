const fs = require('fs');
const path = require('path');

const ws = fs.createWriteStream(path.resolve(__dirname, 'name.txt'), {
  flags: 'w',
  encoding: 'utf8', // 文件中存放的都是二进制
  mode: 0o666,
  autoClose: true,
  start: 0,
  highWaterMark: 2, // 一个预估量
});

// 如何判断一个流是可读流还是可写流？
//    可写流：on('data') on('end')
//    可读流: ws.write  ws.end

// flag: 累计写入的内容，达到预估量后，会返回false
const flag = ws.write('1', () => {
  console.log('complete1');
});
console.log('flag1', flag);

const flag2 = ws.write('2', () => {
  console.log('complete2');
});
console.log('flag2', flag2);

const flag3 = ws.write('3', () => {
  console.log('complete3');
});
// 每次write写入都会占用内存，而highWaterMark是对于当前所有write方法写入字节的总和预估量
console.log('flag3', flag3);

