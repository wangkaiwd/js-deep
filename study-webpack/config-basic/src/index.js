import txt from './title.txt';
import './styles/style.css';
import './styles/less.less';
import './styles/scss.scss';
import bucket from './images/bucket.png';
import 'lodash';
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

// webpack.ProvidePlugin: 不用手动引入，该插件会为用到变量的模块自动引入配置的第三方模块
// const other = _.concat([], 2, 3, 4);
// console.log(other);
