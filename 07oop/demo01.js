function func () {
  const x = 100;
  this.num = x + 100;
}

const f = new func(); // 通过new执行的时候，func就是一个自定义的类

// func(); // 普通函数执行 this => window
