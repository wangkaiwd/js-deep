import txt from './title.txt';
import './styles/style.css';
import './styles/less.less';
import './styles/scss.scss';
import bucket from './images/bucket.png';
// A loader for webpack that allows importing files as a String.
console.log('txt', txt);
document.querySelector('.text').innerHTML = txt;
console.log('bucket', bucket);
const image = new Image();
image.src = bucket;
document.body.appendChild(image);
