function dataProxyTest (vm) {
  // vm.arr[0] = 0;
  // 没有为数组的索引key设置set/get方法，只会触发arr的get方法
  // console.log(vm.arr[0]);
  // vm.arr.push({ a: 1 });
  // console.log(vm.arr[3].a);
}

export default dataProxyTest;
