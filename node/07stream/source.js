const { Readable } = require('stream');

// class MyReadable extends Readable {
//   _read (size) {
//     // 需要读取的数据
//     this.push('123');
//     // 传递chunk作为null是流结束的标识，在这之后，没有更多的数据可以被写入，会emit end事件
//     this.push(null);
//   }
// }
//
// const my = new MyReadable();
// my.on('data', function (data) {
//   console.log('data', data);
// });
// my.on('end', () => {
//   console.log('end');
// });
