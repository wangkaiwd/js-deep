function add (...outerArgs) {
  let args = outerArgs;

  function resultFn (...innerArgs) {
    args = args.concat(innerArgs);
    return args.length >= 3 ? args.reduce((a, b) => a + b) : resultFn;
  }

  // 直接执行，如果第一次执行add时参数的数量就达到了3个，会直接求和
  return resultFn();
}

console.log(add(2)(3)(4)); // 9
console.log(add(2, 3)(4));  // 9
console.log(add(2, 3, 4));  // 9
console.log(add(2)(3, 4)); // 9
