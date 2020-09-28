const fs = require('fs');
const ReadStream = require('./ReadableStream');
const WriteStream = require('./WriteableStream');

// const r = fs.createReadStream('pipe1.txt', {
const r = new ReadStream('pipe1.txt', {
  highWaterMark: 4
});
// const w = fs.createWriteStream('pipe2.txt', {
const w = new WriteStream('pipe2.txt', {
  highWaterMark: 1
});
// r.on('data', (data) => {
//   const flag = w.write(data);
//   console.log('write');
//   if (!flag) {
//     r.pause();
//   }
// });
//
// // 等到可读流缓冲区内的所有数据都被写入后，触发drain事件
// w.on('drain', () => {
//   r.resume();
// });
// r.on('end', () => {
//   console.log('end');
// });

// pipe内容会进行控制可读流的读取和暂停行为
// 并在写入流将缓冲区中的内容清空后触发drain事件，恢复可写流的写入
// 1. 异步
// 2. 缺点：看不到读取的过程
r.pipe(w);
