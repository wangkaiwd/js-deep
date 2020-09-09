import { h, patch, render } from '../../source/vue/v-dom';

// https://excalidraw.com/#json=4776455569408000,-OWWGd4HPZ9kgDuSTyVWMw
// 生成虚拟DOM
// 虚拟DOM是用对象来模拟一个真实的DOM,方便对其进行操作和使用
const app = document.querySelector('#app');

// <div id="container">
//   <span style="color:red">hello</span>
//   world
// </div>
// 子节点为string时，需要表示为 {tag: undefined, props: undefined, key: undefined, children: undefined, text: 'text' }
const oldVNode = h(
  'ul',
  { id: 'container', key: 1 },
  h('li', { key: 'a', style: { background: 'red' } }, 'a'),
  h('li', { key: 'b', style: { background: 'yellow' } }, 'b'),
  h('li', { key: 'c', style: { background: 'blue' } }, 'c'),
  h('li', { key: 'd', style: { background: 'pink' } }, 'd')
);
render(oldVNode, app);

const newVNode = h('ul', { id: 'id', key: 1 },
  h('li', { key: 'e', style: { background: 'red' } }, 'e'),
  h('li', { key: 'a', style: { background: 'red' } }, 'a'),
  h('li', { key: 'f', style: { background: 'yellow' } }, 'f'),
  h('li', { key: 'c', style: { background: 'blue' } }, 'c'),
  h('li', { key: 'n', style: { background: 'pink' } }, 'n'),
);
setTimeout(() => {
  patch(oldVNode, newVNode);
}, 2000);
