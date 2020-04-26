const obj1 = { a: 1, b: 2, c: { name: 'hh' } };
const obj2 = {};

for (const obj1Key in obj1) {
  obj2[obj1Key] = obj1[obj1Key];
}
console.log(obj2);
