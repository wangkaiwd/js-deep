function asyncUpdateTest (vm) {
  setTimeout(() => {
    // 每进行一次赋值就会更新一次视图，比较浪费性能
    vm.msg = 'aaa';
    vm.msg = 'bbb';
    vm.msg = 'ccc';
    vm.person.name = 'async update';
  }, 3000);
}

export default asyncUpdateTest;
