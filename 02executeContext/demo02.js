// 1.阿里面试题

let a = {
  n: 10,
};

let b = a;

b.m = b = {
  n: 20,
};
console.log(a);  // { n: 10, m: { n: 20 } }
console.log(b);  // { n: 20 }

// 2. 360面试题

// let x = [12, 23];
// function fn (y) {
//   y[0] = 100;
//   y = [100];
//   y[1] = 200;
//   console.log(y); // [100, 200]
// }
//
// fn(x);
// console.log(x); // [100,23]

// 3.
// let x = 10;
//
// ~function (x) {
//   console.log(x);
//   x = x || 20 && 30 || 40;
//   console.log(x);
// }();
//
// console.log(x);

// 4.
let x = [1, 2], y = [3, 4];
~function (x) {
  x.push('A');
  x = x.slice(0);
  x.push('B');
  x = y;
  x.push('C');
  console.log(x, y); // [3, 4, 'C'], [3, 4, 'C']
}(x);

console.log(x, y); // [1, 2 ,'A'], [3, 4, 'C']
