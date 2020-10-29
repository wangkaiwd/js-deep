const express = require('./my-express');
const app = express();
app.get('/', (req, res) => {
  res.end('get /');
});

app.post('/', (req, res) => {
  res.end('post /');
});

app.delete('/', (req, res) => {
  res.end('delete /');
});

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
