// 可读流
// 内部基于发布订阅模式
// 流：基于事件 Events模块

// 文件流：特有，打开和关闭方法
const fs = require('fs');
const ReadableStream = require('./ReadableStream');
const rs = fs.createReadStream('./name.txt', {
// const rs = new ReadableStream('./name.txt', {
  flags: 'r', // 文件系统标识
  encoding: null, // 编码， 默认是buffer
  fd: null, // 文件描述符，表示打开的文件
  mode: 0O666, // 文件权限
  autoClose: true, // 是否自动关闭
  start: 0, // start 和 end 都会包含，并且start从0开始计数
  end: 3,
  highWaterMark: 2, // 表示每次读几个
});

rs.on('open', (fd) => {
  console.log('文件打开了', fd);
});
let str = '';
// 数据拼接要使用buffer
const arr = [];
// 默认可读流是暂停模式的，
// 当监听data事件后会自动变成流动模式
rs.on('data', (data) => {
  console.log('data', data, data.toString());
  str += data; // 当是文字的时候会读取出错
  arr.push(data);
  rs.pause();
});
setTimeout(() => {
  rs.resume();
}, 2000);

rs.on('end', () => {
  console.log('end', str);
  console.log('end1', Buffer.concat(arr).toString());
});
rs.on('error', (err) => {
  console.log('error', err);
});
// 文件读取完毕才会触发
rs.on('close', (fd) => {
  console.log('文件关闭了');
});
