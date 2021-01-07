import Vue from '../index';
import { compileToFunctions } from '../compiler';
import { patch } from '../vdom/patch';

export function random () {
  const template = `
   <div id="app">
     <ul>
       <li style="background:yellow;" key="D">D</li>
       <li style="background:green;" key="B">B</li>
       <li style="background:pink;" key="Z">Z</li>
       <li style="background:purple;" key="F">F</li>
     </ul>
   </div> `;

  const template2 = `<div id="app">
    <ul>
      <li style="background:purple;" key="F">F</li>
      <li style="background:yellow;" key="D">D</li>
      <li style="background:blue;" key="Q">Q</li>
      <li style="background:green;" key="B">B</li>
      <li style="background:pink;" key="M">M</li>
    </ul>
  </div>`;
  const vm = new Vue({ template }); // 没有el不会执行vm.$mount()
  const render1 = compileToFunctions(template);
  const oldVNode = render1.call(vm);
  patch(document.getElementById('app'), oldVNode);
  const render2 = compileToFunctions(template2);
  const vNode = render2.call(vm);
  setTimeout(() => {
    patch(oldVNode, vNode);
  }, 5000);
}
