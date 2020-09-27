const fs = require('fs');
const path = require('path');
const absPath = (...dir) => path.resolve(__dirname, ...dir);
const ws = fs.createWriteStream(absPath('name1.txt'), { highWaterMark: 2 });
let flag = undefined;

// 可写流每次写入的底层逻辑：
//  1. 异步逻辑进行同步处理
//  2. 每次会处理highWaterMark个数据，首先写入第一个数据，其它剩余数据会放到链表中进行存储，
//     第一个写入后，拿出链表中第一个进行写入，写入完成后，继续写入链表中的下一个，以此递推

// flag = ws.write('hhh', () => {
//   console.log(1);
// });
// ws.end();

// ws.on('open', (fd) => {
//   console.log('open', fd);
// });
// ws.on('close', () => {
//   console.log('close');
// });
// ws.on('error', (err) => {
//   console.log('err', err);
// });


