import { h } from '../../source/vue/vdom';
// 新节点末尾插入元素
export const oldVNode = h(
  'ul', { id: 'container', key: 1, style: { backgroundColor: 'yellow' } },
  h('li', { key: 'a', style: { background: 'red' } }, 'a'),
  h('li', { key: 'b', style: { background: 'yellow' } }, 'b'),
  h('li', { key: 'c', style: { background: 'blue' } }, 'c'),
  h('li', { key: 'd', style: { background: 'pink' } }, 'd'),
);

export const newVNode = h('ul', {
    id: 'aa',
    class: 'new-vnode',
    style: { backgroundColor: 'red' },
    key: 2
  },
  h('li', { key: 'e', style: { background: 'red' } }, 'e'),
  h('li', { key: 'a', style: { background: 'red' } }, 'a'),
  h('li', { key: 'f', style: { background: 'yellow' } }, 'f'),
  h('li', { key: 'c', style: { background: 'blue' } }, 'c'),
  h('li', { key: 'n', style: { background: 'pink' } }, 'n'),
);
