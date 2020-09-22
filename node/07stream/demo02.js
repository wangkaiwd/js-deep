// copy 文件 (读一点，写一点)
const fs = require('fs');
const path = require('path');
const size = 3;
const buffer = Buffer.alloc(size);
let position = 0;
fs.open('./name.txt', (err, rfd) => {
  fs.open('./name1.txt', 'w', (err, wfd) => {
    function readAndWrite () {
      // buffer: 123 position: 0
      // buffer:     position: 3
      fs.read(rfd, buffer, 0, size, position, (err, bytesRead) => {
        console.log('position', position, buffer.toString(), bytesRead);
        if (!bytesRead) {
          fs.close(rfd, () => {});
          fs.close(wfd, () => {});
          return;
        }
        position += bytesRead;
        fs.write(wfd, buffer, 0, bytesRead, (err, bytesWritten) => {
          readAndWrite();
        });
      });
    }

    readAndWrite();
  });
});
