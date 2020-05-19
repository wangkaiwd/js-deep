function * read () {
  const a = yield 1;
  console.log('a', a);
  const b = yield 2;
  console.log('b', b);
  const c = yield 3;
  console.log('c', c);
}

const it = read(); // 并没有执行

// 调用next开始执行，并在遇到field时暂停
// it.next(); // 此时会在yield 1之前暂停，并不会执行到打印语句
// it.next(); // 执行到yield 2 之前暂停，会打印a，但此时a是undefined

// 第一次执行时，会在第一个yield之前暂停，所以传入的内容并不会生效，没有意义
it.next('hello'); // next中传入的参数将会是执行完成的yield的返回值
it.next('world'); // a = word

