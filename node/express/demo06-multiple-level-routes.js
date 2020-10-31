const express = require('./my-express');
const app = express();
const router = express.Router();

router.get('/add', (req, res, next) => {
  res.end('add');
});

router.get('/remove', (req, res, next) => {
  res.end('remove');
});

app.use('/user', router);

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
