const EventEmitter = require('events');

// 继承EventEmitter
class ReadableStream extends EventEmitter {
  constructor () {
    super();
  }

}

module.exports = ReadableStream;
