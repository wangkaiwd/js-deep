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
fs.open(absPath('name.txt'), 'r', 0O666, (err, fd) => {

});
