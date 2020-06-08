Array.prototype.mySlice = function (start = 0, end = this.length) {
  const array = [];
  // 一般会通过Array的实例(数组)调用该方法，所以this指向调用该方法的数组
  // 这里我们将this指向了arguments = {0: 1, 1: 2, 2: 3, length: 3}
  for (let i = 0; i < end; i++) {
    array[i] = this[i];
  }
  return array;
};

function fn () {
  return Array.prototype.mySlice.call(arguments);
}

console.log(fn(1, 2, 3));
