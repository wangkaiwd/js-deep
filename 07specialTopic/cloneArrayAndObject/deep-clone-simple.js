// 原理：递归遍历数据或对象中的每一项，将其赋值给一个新的对象，最后返回遍历后生成的新数组
// 可以通过JSON.stringify来进行深拷贝

// 实现最简易版本的deepClone
const deepClone = (value) => { // clone之后返回深拷贝后的内容
  if (Array.isArray(value)) { // 数组
    const result = [];
    value.forEach(item => {
      result.push(deepClone(item));
    });
    return result;
  } else if (typeof value === 'object' && value !== null) {
    const result = {};
    if (Object.prototype.toString.call(value) === '[object Object]') { // 普通对象
      const keys = Object.keys(value);
      keys.forEach(key => {
        result[key] = deepClone(value[key]);
      });
    }
    return result;
  }  else {
    return value;
  }
};
// const obj = { a: 1, b: { c: 1 } };
// const cloneObj = deepClone(obj);