// 可读流
// 内部基于发布订阅模式
// 流：基于事件 Events模块

// 文件流：特有，打开和关闭方法
const fs = require('fs');
const rs = fs.createReadStream('./name.txt', {
  flags: 'r', // 文件系统标识
  encoding: null, // 编码， 默认是buffer
  fd: null, // 文件描述符，表示打开的文件
  mode: 0O666, // 文件权限
  autoClose: true, // 是否自动关闭
  start: 0, // start 和 end 都会包含，并且start从0开始计数
  end: 3,
  highWaterMark: 3, // 表示每次读几个
});


