const http = require('http');
const fs = require('fs');
const path = require('path');
let start = 0;
const step = 5;

function download () {
  const end = start + step - 1;
  const options = {
    port: 3000,
    headers: {
      Range: `bytes=${start}-${end}`
    },
    path: '/1.txt'
  };
  http.get(options, (res) => {
    const total = res.headers['content-range'].split('/')[1];
    if (start > total) {return;}
    const writeStream = fs.createWriteStream(path.join(__dirname, '2.txt'), { flags: 'a' });
    res.pipe(writeStream);
    res.on('end', () => {
      setTimeout(() => {
        start += step;
        download();
      }, 1000);
    });
    // const arr = [];
    // res.on('data', (data) => {
    //   fs.appendFileSync(path.join(__dirname, '2.txt'), data);
    //   setTimeout(() => {
    //     start += step;
    //     download();
    //   }, 1000);
    // });
  });
}

download();

