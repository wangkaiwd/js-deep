const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

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

  write () {

  }
}

module.exports = WriteableStream;
