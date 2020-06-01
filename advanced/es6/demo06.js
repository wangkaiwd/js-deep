const Animal = (function () {
  function Animal () {
    if (!(this instanceof Animal)) {
      throw Error('constructor function must called with new keyword');
    }
    this.name = 'Panda';
  }

  return Animal;
})();
// 类必须使用new来调用
Animal();
