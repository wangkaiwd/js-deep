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
  'ul',
  { id: 'container', key: 1 },
  h('li', { key: 'a', background: 'red' }, 'a'),
  h('li', { key: 'b', background: 'yellow' }, 'b'),
  h('li', { key: 'c', background: 'blue' }, 'c'),
  h('li', { key: 'd', background: 'pink' }, 'd')
);
render(oldVNode, app);

const newVNode = h('ul', { id: 'id', key: 1 },
  h('li', { key: 'a', background: 'red' }, 'a'),
  h('li', { key: 'b', background: 'yellow' }, 'b'),
  h('li', { key: 'c', background: 'blue' }, 'c'),
  h('li', { key: 'd', background: 'pink' }, 'd'),
  h('li', { key: 'e', background: 'purple' }, 'e'),
);

patch(oldVNode, newVNode);
