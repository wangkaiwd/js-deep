const adapter = require('./demo04');
const promisesAplusTests = require('promises-aplus-tests');

promisesAplusTests(adapter, function (err) {
  console.log('err', err);
});


