const EventEmitter = require('events');

class ReadableStream extends EventEmitter {
  constructor (path, options) {
    super();
  }
}

module.exports = ReadableStream;
