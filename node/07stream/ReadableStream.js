const EventEmitter = require('events');
const fs = require('fs');

// 继承EventEmitter
class ReadableStream extends EventEmitter {
  constructor (path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || 'r';
    this.encoding = options.encoding;
    this.fd = options.fd;
    this.mode = options.mode || 0O666;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.end = options.end;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.pos = 0;
    this.flowing = false;
    this.open();
    this.on('newListener', (type) => {
      // 监听'data'事件流是暂停模式的，监听data事件后会自动变成流动模式
      if (type === 'data') {
        this.flowing = true;
        this.read();
      }
    });
  }

  open () {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.emit('error', err);
      }
      this.fd = fd;
      this.emit('open', fd);
    });
  }

  // 这里会同步执行，而打开文件是异步任务
  read () {
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read);
    }
    const buffer = Buffer.alloc(this.highWaterMark);
    const readLength = this.end
      ?
      Math.min(this.end - this.pos + 1, this.highWaterMark)
      :
      this.highWaterMark;
    fs.read(this.fd, buffer, 0, readLength, this.pos, (err, bytesRead) => {
      if (!bytesRead) {
        this.emit('end');
        return this.close();
      }
      this.pos += bytesRead;
      // 需要截取出写入的内存，最后写入的内容可能会小于buffer分配的内存
      this.emit('data', buffer.slice(0, bytesRead));
      if (this.flowing) {
        this.read();
      }
    });
  }

  close () {
    fs.close(this.fd, () => {
      this.emit('close');
    });
  }

  pause () {
    this.flowing = false;
  }

  resume () {
    this.flowing = true;
    this.read();
  }
}

module.exports = ReadableStream;
