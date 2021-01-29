// const title = require('./title02');
// import title from './title02';
const p = import('./title02');
p.then((result) => {
  console.log('title', result);
});

// require es module
// title = {age: 'title_age', default: 'title_name'}
// es6 Module
