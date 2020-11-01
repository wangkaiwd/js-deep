const express = require('./my-express');

const app = express();

app.get('/name/:id/:age', function (req, res, next) {
  res.end(JSON.stringify(req.params));
});

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
