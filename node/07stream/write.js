const fs = require('fs');
const path = require('path');
const WritableStream = require('./WriteableStream');
// const ws = fs.createWriteStream(path.resolve(__dirname, 'name2.txt'), {
const ws = new WritableStream(path.resolve(__dirname, 'name2.txt'), {
  fd: null,
  mode: 0o666,
  flags: 'w',
  encoding: 'utf8',
  autoClose: true,
  start: 0,
  highWaterMark: 3
});
ws.on('open', (fd) => {
  console.log('open', fd);
});
// For streams not operating in object mode, chunk must be a string, Buffer or Unit8Array.
// For object mode streams, chunk may any JavaScript value other than null
ws.write('1', () => {
  console.log(1);
});

ws.write('2', () => {
  console.log(2);
});

ws.write('3', () => {
  console.log(3);
});
