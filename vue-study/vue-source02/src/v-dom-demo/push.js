import Vue from '../index';

export function domPush () {
  const template = `
    <div id="app">
      <ul>
        <li key="a" style="color: #9DBCD4">a</li>
        <li key="b" style="color: #FFFD01">b</li>
        <li key="c" style="color: #6D5ACF">c</li>
        <li key="d" style="color: #FFAB0F">d</li>
      </ul>
    </div>
    `;

  const vm = new Vue({ el: '#app', template });
  console.log(vm);
}

