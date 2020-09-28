const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const LinkedList = require('../linked/SimpleLinkedList');

class Queue {
  constructor () {
    this.linkedList = new LinkedList();
  }

  enQueue (node) {
    this.linkedList.add(node);
  }

  deQueue () {
    return this.linkedList.remove(0);
  }
}

class WriteableStream extends EventEmitter {
  constructor (path, options) {
    super();
    this.initProperty(path, options);
    this.open();
  }

  initProperty (path, options) {
    this.path = path;
    this.fd = options.fd || null;
    this.mode = options.mode || 0o666;
    this.flags = options.flags || 'w';
    this.autoClose = options.autoClose || true;
    this.encoding = options.encoding || 'utf8';
    this.start = options.start || 0;
    this.highWaterMark = options.highWaterMark || 16 * 1024;

    this.caches = new Queue();
    this.writing = false;
    this.needDrain = false;
    // 总共写入的Buffer的length，如果超过
    this.len = 0;
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

  clearBuffer () {
    const node = this.caches.deQueue();
    if (node) { // 取出队列中第一个元素，继续进行写入
      const { chunk, encoding, cb } = node.element;
      // 一个接一个写入
      this._write(chunk, encoding, cb);
    } else { // 缓存清空了
      this.writing = false;
      if (this.needDrain) {
        // 触发drain事件
        this.needDrain = false;
        this.emit('drain');
      }
    }
  }

  write (chunk, encoding, cb) {
    if (typeof encoding === 'function') {
      cb = encoding;
      encoding = 'utf8';
    }
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.len += chunk.length;
    if (this.writing) { // 正在写入需要存到队列中
      this.caches.enQueue({
        chunk,
        encoding,
        cb
      });
    } else {
      this.writing = true;
      this._write(chunk, encoding, cb);
    }
    const flag = this.len < this.highWaterMark;
    this.needDrain = !flag;
    return flag;
  }

  _write (chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, cb));
    }
    fs.write(this.fd, chunk, 0, chunk.length, (err, written) => {
      cb && cb();
      this.writing = false;
      // 写完之后将对应的写入长度减去
      this.len -= written;
      this.clearBuffer();
    });
  }
}

module.exports = WriteableStream;
