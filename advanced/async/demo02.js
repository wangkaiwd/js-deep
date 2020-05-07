const fs = require('fs');

function after (times, fn) {
  const result = {};
  return (key, value) => {
    result[key] = value;
    // -- 在前，先自减，再参与运算
    if (--times === 0) {
      fn(result);
    }
  };
}

const outer = after(2, (result) => {
  console.log('result', result);
});
fs.readFile('./a.txt', 'utf-8', (error, data) => {
  outer('a', data);
});

fs.readFile('./b.txt', 'utf-8', (error, data) => {
  outer('b', data);
});

