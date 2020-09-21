// fs.open fs.read fs.write fs.close
const fs = require('fs');
const path = require('path');

// return a new initialized Buffer of the specified size.
const buf = Buffer.alloc(3);

// mode: 0o666
// 权限：读取权限  写入权限  执行权限
// rwx(表示用户是否可读可写可执行) rwx(我所属组是否有读写执行的权限) rwx
// fd: 文件描述符，它代表了文件name.txt拥有了读取这个文件的权限，类型是一个number类型
// https://stackoverflow.com/a/36771339/11720536
fs.open(path.resolve(__dirname, 'name.txt'), (err, fd) => {
  fs.read(fd, buf, 0, 3, 0, (err, bytesRead) => {
    console.log('bytesRead', bytesRead);
    console.log(buf.toString());
  });
});
