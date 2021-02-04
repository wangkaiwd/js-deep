// const image = require('./images/img.png');
const image = require('./images/img_1.png');
// console.log('image', image);
const img = document.createElement('img');
// img.src = image.default
// how to handle module type(commonjs or es module) when url loader combine with file loader
img.src = image;
document.body.appendChild(img);
