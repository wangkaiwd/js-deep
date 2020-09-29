// 中间层可以解决跨域问题

const http = require('http');
// 爬虫

const options = {
  port: 3000,
  hostname: 'localhost',
  path: '/?a=1',
  method: 'post'
};
const client = http.request(options, (res) => {
  // res: 可读流
  let arr = [];
  res.on('data', (chunk) => {
    arr.push(chunk);
  });
  res.on('end', () => {
    console.log(Buffer.concat(arr).toString());
  });
});
client.end('world');
