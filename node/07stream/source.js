const { Readable, Writable, Duplex, Transform } = require('stream');
const path = require('path');
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

class MyWritable extends Writable {
  // class extends another class and has no constructor: https://javascript.info/class-inheritance#overriding-constructor
  _write (chunk, encoding, cb) {
    console.log(chunk.toString());
    cb();
  }
}

const myWs = new MyWritable();
myWs.write('123', () => {
  console.log('ok');
});
myWs.write('456', () => {
  console.log('ok');
});
myWs.write('789', () => {
  console.log('ok');
});

// 可读可写，内部继承了可读流和可写流
class MyDuplex extends Duplex {
  _read (size) {

  }

  _write (chunk, encoding, cb) {

  }
}

// 转化流： 压缩
class MyTransform extends Transform {
  _transform (chunk, encoding, callback) {
  }
}
