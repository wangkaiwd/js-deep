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
image.style.width = '100px';
image.style.height = '200px';

document.body.appendChild(image);

const fn = () => {
  console.log(1);
};
