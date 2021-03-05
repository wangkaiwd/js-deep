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
  } else {
    return value;
  }
};

// 当对象元素嵌套很深时，会超出最大的调用栈

function exceedMaxCallStack () {
  const obj = { child: {} };
  let child = obj.child;
  for (let i = 0; i < 3000; i++) {
    child.child = {};
    child = child.child;
  }
  child.a = 1;
  const cloneObj = deepClone(obj);
  console.log(cloneObj);
}