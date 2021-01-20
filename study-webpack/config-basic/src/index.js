import txt from './title.txt';
import './style.css';
// A loader for webpack that allows importing files as a String.
console.log('txt', txt);
document.querySelector('.text').innerHTML = txt;
