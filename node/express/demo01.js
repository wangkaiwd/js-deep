const express = require('./my-express');
const app = express();

app.get('/', (req, res) => {
  res.end('first demo');
});

app.get('/user', (req, res) => {
  res.end('user!');
});

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
