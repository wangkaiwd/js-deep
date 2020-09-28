const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class ReadableStream extends EventEmitter {
  constructor (path, options) {
    super();
    this.setDefaultValue(path, options);
    this.open();
    this.on('newListener', (type) => {
      if (type === 'data') {
        this.read();
      }
    });
  }

  setDefaultValue (path, options) {
    this.path = path;
    this.flags = options.flags || 'r';
    this.encoding = options.encoding || null; // 默认会读取为Buffer
    this.fd = options.fd || null;
    this.mode = options.mode || 0o666;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.end = options.end || Infinity;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.pos = 0;

    this.flowing = false;
  }

  pause () {
    this.flowing = false;
    // 当读取完了之后，要调用this.close
  }

  resume () {
    this.flowing = true;
    this.read();
  }

  open () {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        return this.emit('error', err);
      }
      this.fd = fd;
      this.emit('open', fd);
    });
  }

  read () {
    // 文件打开是异步的，只有在打开后才会得到file descriptor
    // console.log('fd', this.fd);
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read);
    }
    const buff = Buffer.alloc(this.highWaterMark);
    const howMuchRead = this.end ? Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark;
    fs.read(this.fd, buff, this.start, howMuchRead, this.pos, (err, bytesRead) => {
      // 当读取到的字节为0时，说明读取完了文件中的所有内容
      this.pos += bytesRead;
      if (!bytesRead) {
        return this.close();
      }
      this.flowing = true;
      // 这里会同步执行
      this.emit('data', buff.slice(0, bytesRead));
      if (this.flowing) {
        this.read();
      }
    });
  }

  close () {
    fs.close(this.fd, () => {
      this.emit('end');
      this.emit('close');
    });
  }
}

module.exports = ReadableStream;
