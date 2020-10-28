const express = require('express');
const app = express();

app.get('/a', function (req, res, next) {
  console.log(1);
  next();
}, function (req, res, next) {
  console.log(11);
  next();
}, function (req, res, next) {
  console.log(111);
  next();
});

app.get('/a', function (req, res) {
  console.log(2);
  res.end('hello!');
});
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
