import Vue from '../index';
import { compileToFunctions } from '../compiler';
import { patch } from '../vdom/patch';

export function firstToLast () {
  const template = `
    <div id="app">
      <ul>
        <li key="a" style="background: #9DBCD4">a</li>
        <li key="b" style="background: #FFFD01">b</li>
        <li key="c" style="background: #6D5ACF">c</li>
        <li key="d" style="background: #FFAB0F">d</li>
      </ul>
    </div>
    `;
  const template2 = `
    <div id="app">
      <ul>
        <li key="b" style="background: #FFFD01">b</li>
        <li key="c" style="background: #6D5ACF">c</li>
        <li key="d" style="background: #FFAB0F">d</li>
        <li key="a" style="background: #9DBCD4">a</li>
      </ul>
    </div>
  `;
  const vm = new Vue({ template });
  const render1 = compileToFunctions(template);
  const oldVNode = render1.call(vm);
  patch(document.getElementById('app'), oldVNode);
  const render2 = compileToFunctions(template2);
  const vNode = render2.call(vm);
  setTimeout(() => {
    patch(oldVNode, vNode);
  }, 2000);

}
