// generator 生成器 生成的是迭代器
// generator函数可以暂停
function * read () {
  yield 1; // 产出，执行遇到yield时会暂停(suspend)
  yield 2;
  yield 3;
  yield 4;
}

const it = read(); // iterator 迭代器中包含一个next方法
// console.log('it', it);
// console.log(it.next()); // it.next返回一个对象{value:any, done: boolean},value:返回值，done是否完成迭代
// console.log(it.next());

// 手动迭代，比较麻烦，想办法进行自动迭代
let done = false;

while (!done) { // 迭代完成后，done为true
  const object = it.next();
  done = object.done;
  console.log(object.value);
}
