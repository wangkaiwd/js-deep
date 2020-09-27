const fs = require('fs');
const path = require('path');

// copy:
//  1. fs.open + fs.read
//  2. fs.open + fs.write
//  3. fs.close
// 搜索技巧：由于文档中对应内容没有锚点，相应的搜索结果中可以现在google中查看是否有想要的关键字，然后进入页面后使用ctrl + f再进行搜索
// path: 打开的文件路径
// flags: 文件系统标识，默认 'r'
// mode: file modes, sets the file mode(permission and sticky bits),but only if the file was created

// callback(err,fd), fd: file descriptor
// on POSIX system, for every process, the kernel maintain a table of currently open files and resource.
// Each open file is assigned a simple numeric identifier called file descriptor.
// At system-level, all file system operations use these file descriptor to identify and track each specific file

// fs.open method is used to allocate a new file descriptor. Once allocated, the file descriptor may be used to read data from, write data to , or request information about the file
const absPath = (...dir) => path.resolve(__dirname, ...dir);
// const size = 3;
// const buffer = Buffer.alloc(size);
// fs.open(absPath('name.txt'), 'r', 0o666, (err, fd) => {
//   console.log('fd', fd);
//   // fd: file descriptor
//   // buffer: data will be written to
//   // offset: the offset in the buffer to start writing at
//   // length: is an integer specifying the number of bytes to read
//   // position: is an argument specifying where to begin reading from in the file.
//   // 将打开的文件的内容写入到buffer中
//   fs.read(fd, buffer, 0, size, 0, (err, bytesRead) => {
//     console.log('bytesRead', bytesRead);
//     console.log('buffer', buffer.toString());
//   });
// });

// write data to file, must specify flags to 'w'
// const buffer = Buffer.from('123');
// fs.open(absPath('name1.txt'), 'w', 0o666, (err, fd) => {
//   // 将buffer中的数组写入文件
//   fs.write(fd, buffer, 0, 3, 0, (err, written) => {
//     console.log('written', written);
//   });
// });

function copy () {
  const size = 3;
  const buffer = Buffer.alloc(size);
  let pos = 0;
  fs.open(absPath('name.txt'), 'r', 0o666, (err, rfd) => {
    fs.open('name1.txt', 'w', 0o666, (err, wfd) => {
      function next () {
        fs.read(rfd, buffer, 0, size, pos, (err, bytesRead) => {
          if (!bytesRead) {
            // 关闭
            fs.close(rfd, () => {});
            fs.close(wfd, () => {});
            return;
          }
          // 当读到最后的时候，可能剩余的不满足指定的个数，这时候需要根据实际读取的内容来进行调整
          pos += bytesRead;
          fs.write(wfd, buffer, 0, bytesRead, (err, written) => {
            next();
          });
        });
      }

      next();
    });
  });
}

copy();
