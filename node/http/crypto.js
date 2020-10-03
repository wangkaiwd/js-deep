const crypto = require('crypto');

// digest: 摘要
const r = crypto.createHash('md5').update('hello').digest('base64');
// 即使内容变化不大，但是也会生成新的结果
console.log('r', r);
