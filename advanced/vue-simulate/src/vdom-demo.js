const app = document.getElementById('app');
// app上的属性有很多,遍历起来会比较浪费性能
// 为了节约性能，我们可以用一个对象来表示一个dom 节点，然后通过对象将真实节点渲染到页面中

// 在前端操作DOM的时候， 如 排序，删除等
// 会diff新的节点，再生成一个对象

// 在vue中基本上不用手动操作dom
// for (const key in app) {
//
// }

// usage

// 虚拟DOM只是一个对象(通过一个对象来模拟dom结构)
// const vdom = {
//   tag: 'div',
//   props: {},
//   children: [
//     {
//       tag: undefined,
//       props: undefined,
//       children: undefined,
//       text: 'hello'
//     }
//   ]
// };
// new Vue({
//   render(h) {
//     return h('div',{},'hello')
//   }
// })
