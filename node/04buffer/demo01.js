// const buffer = Buffer.alloc(10);
// console.log('buffer', buffer);
//
const buffer1 = Buffer.from('张三');
// console.log('buffer1', buffer1);
//
// const buffer2 = Buffer.from([0xe7, 0x8, 0xa0]);
// console.log('buffer2', buffer2);

// Buffer可以和字符串任意转化
console.log(buffer1.toString('base64'));
// base64 转换方式

// 不能转换大图片
