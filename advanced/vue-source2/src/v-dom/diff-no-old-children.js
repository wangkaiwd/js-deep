import { h, patch, render } from '../../source/vue/v-dom';

// 生成虚拟DOM
// 虚拟DOM是用对象来模拟一个真实的DOM,方便对其进行操作和使用
const app = document.querySelector('#app');

// <div id="container">
//   <span style="color:red">hello</span>
//   world
// </div>
// 子节点为string时，需要表示为 {tag: undefined, props: undefined, key: undefined, children: undefined, text: 'text' }
const oldVNode = h(
  'div',
  { id: 'container', key: 1 },
);

// render(oldVNode, app);
render(oldVNode, app);

const newVNode = h(
  'div',
  { id: 'dd', key: 1 },
  h(
    'span',
    { style: { color: 'red' } },
    'hello',
  ),
  'world'
);

// 老节点没有子节点
patch(oldVNode, newVNode);
