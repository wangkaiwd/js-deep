function dependenceCollectionArray (vm) {
  // vm.arr.push(4);
  // 这行代码单独执行时会更新ui，因为ui视图是异步更新的，所以在更新视图取值时会取到最新的值
  // 如果单独执行这行，由于没有对其收集依赖，所以并不会调用视图更新方法，我们需要对数组再进行递归依赖收集
  vm.arr[0].push(2);
}

export default dependenceCollectionArray;
