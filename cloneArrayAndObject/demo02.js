const obj1 = { a: 1, b: 2, c: { name: 'hh' } };
const obj2 = {};

for (const obj1Key in obj1) {
  if (!obj1.hasOwnProperty(obj1Key)) {break;}
  obj2[obj1Key] = obj1[obj1Key];
}
