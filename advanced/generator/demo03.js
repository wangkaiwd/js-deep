// generator + promise
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// 先读取文件a的结果，文件a会返回文件b的地址，然后读取文件b的内容，最终将文件b的内容进行返回
function * read () { // 暂停
  const a = yield readFile('./a.txt', 'utf8');
  const b = yield readFile(a, 'utf8');
  return b;
}

const it = read();
const { value } = it.next();
value.then((bPath) => {
  // 会有换行符(不知道原因)
  const bPathWithoutSpace = bPath.replace(/\s/g, '');
  const { value: value2 } = it.next(bPathWithoutSpace); // 参数是yield的返回值，在这里会赋值给a
  value2.then((bContent) => {
    console.log('bContent', bContent);
    const bContent2 = it.next(bContent);
    console.log('bContent2', bContent2);
  });
});
