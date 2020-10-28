const express = require('./my-express');
const app = express();

app.get('/aa', function (req, res, next) {
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
