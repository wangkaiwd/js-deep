const fs = require('fs');
const path = require('path');
const absPath = (...dir) => path.resolve(__dirname, ...dir);
const ReadableStream = require('./readableStream');
// const rs = fs.createReadStream(absPath('name.txt'), {
const rs = new ReadableStream(absPath('name.txt'), {
  flags: 'r', // 文件系统标识符
  encoding: null, // 默认为buffer
  mode: 0o666, // 设置文件权限和粘滞位(permission and sticky bits)的模式, 但是只会在文件在被创建之后
  fd: null,
  autoClose: true,
  start: 0, // 写入文件的字节范围(read a range of bytes from file instead of entire file)
  end: Infinity,
  highWaterMark: 3, // 默认 64kb => 64 * 1024
});

// 文件流会有open和close事件
rs.on('open', (fd) => {
  console.log('open', fd);
});

const arr = [];
// not specify default encoding, data will be buffer
rs.on('data', (data) => {
  // push return new length of the array
  console.log('data', arr, arr.push(data));
});

rs.on('end', () => {
  console.log('end', Buffer.concat(arr).toString());
});
rs.on('error', (err) => {
  console.log('err', err);
});

rs.on('close', () => {
  console.log('close');
});
