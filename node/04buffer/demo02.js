const buffer = Buffer.from('张三');
console.log(buffer);

const buf1 = buffer.slice(0, 3); // buffer中的内容时引用对象
// console.log('pre', buffer);
// buf1[0] = 100;
// console.log('cur', buffer);

// 字节的长度
console.log(buffer.length);
console.log(Buffer.isBuffer(buffer));

