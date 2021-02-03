const image = require('./images/img.png');
// console.log('image', image);
const img = document.createElement('img');
img.src = image.default;
document.body.appendChild(img);
