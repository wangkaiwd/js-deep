const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// 请求传递的内容如下： multipart/form-data; boundary=something
// // 内容头和内容尾：之间是2个换行

// ------WebKitFormBoundaryMQEWPYgCUwmTAWQa
// Content-Disposition: form-data; name="username"
//
// 123
// ------WebKitFormBoundaryMQEWPYgCUwmTAWQa
// Content-Disposition: form-data; name="password"
//
// 456
// ------WebKitFormBoundaryMQEWPYgCUwmTAWQa
// Content-Disposition: form-data; name="avatar"; filename="english-notes.txt"
// Content-Type: text/plain

// eternal: 永恒的
// eternal life : 永生
// obstacle: 阻碍
// stumble on: 偶然遇到；
// ...
// ------WebKitFormBoundaryMQEWPYgCUwmTAWQa--
// buffer.indexOf(value[,byteOffset][,encoding])
// byteOffset: 在buffer中开始搜索的位置

Buffer.prototype.split = function (separator) {
  const arr = [];
  // 分隔符的长度
  const len = Buffer.from(separator).length;
  // 用于不停的在buffer中进行查找的偏移值
  let offset = 0;
  let current = undefined;
  while ((current = this.indexOf(separator, offset)) !== -1) {
    arr.push(this.slice(offset, current));
    offset = current + len;
  }
  // 将剩余的内容放入数组
  arr.push(this.slice(offset));
  return arr;
};

const betterBody = (options) => {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      const arr = [];
      ctx.req.on('data', (chunk) => {
        arr.push(chunk);
      });
      ctx.req.on('end', () => {
        const allData = Buffer.concat(arr);
        const boundary = '--' + ctx.get('Content-Type').split('=')[1];
        const lines = allData.split(boundary).slice(1, -1);
        const body = {};
        const filePath = path.join(__dirname, options.dest, uuidv4());
        lines.forEach(line => {
          const [head, value] = line.split('\r\n\r\n');
          const headStr = head.toString();
          const key = headStr.match(/name="(.+?)"/)[1];
          if (!headStr.includes('filename')) {
            body[key] = value.toString().slice(0, -2);
          } else {
            console.log('key', key);
            const content = value.slice(0, -2);
            fs.writeFileSync(filePath, content);
          }
        });
        ctx.request.body = body;
        ctx.request.file = { filePath };
        resolve();
      });
    });
    await next();
  };
};

module.exports = betterBody;
