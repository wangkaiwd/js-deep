import { initMixin } from './init';
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './vdom';
import initGlobalApi from './global-api';
import { stateMixin } from './state';
import { compileToFunctions } from './compiler';
import patch from './vdom/patch';

function Vue (options) {
  this._init(options);
}

// 扩展原型
initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
stateMixin(Vue);
initGlobalApi(Vue);
export default Vue;

// 思考渲染过程，思考需要加入diff的代码位置

const vm1 = new Vue({ data: { name: 'zs' } });
const render1 = compileToFunctions(`<div id="app">
  <ul>
    <li style="background:pink;" key="A">A</li>
    <li style="background:green;" key="B">B</li>
    <li style="background:green;" key="C">C</li>
    <li style="background:yellow;" key="D">D</li>
  </ul>
</div>`);
const vNode1 = render1.call(vm1); // 内部的所有方法和属性都是在Vue实例上的
patch(document.getElementById('app'), vNode1);

const vm2 = new Vue({ data: { name: 'ls' } });
// const render2 = compileToFunctions(`<div id="app">
//     <ul>
//       <li style="background:pink;" key="A">A</li>
//       <li style="background:green;" key="B">B</li>
//       <li style="background:green;" key="C">C</li>
//       <li style="background:yellow;" key="D">D</li>
//       <li style="background:purple;" key="E">E</li>
//     </ul>
//   </div>`);
// 加key和不加key?
const render2 = compileToFunctions(`<div id="app">
    <ul>
      <li style="background:purple;" key="E">E</li>
      <li style="background:pink;" key="A">A</li>
      <li style="background:green;" key="B">B</li>
      <li style="background:green;" key="C">C</li>
      <li style="background:yellow;" key="D">D</li>
    </ul>
  </div>`);
const vNode2 = render2.call(vm2);
setTimeout(() => {
  patch(vNode1, vNode2);
}, 2000);
