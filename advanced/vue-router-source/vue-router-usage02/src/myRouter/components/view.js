export default {
  name: 'RouterView',
  functional: true,
  render (h, context) {
    let depth = 0;
    let { parent, data } = context;
    const route = parent.$route;
    // 递归找父级的name为RouterView的思路是错的，因为根本找不到父级为$options.name === RouterView的组件 ?
    // $vnode: 占位符节点  _vnode: 渲染节点
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }
    data.routerView = true;
    const record = route.matched[depth];
    // 在访问/about时，此组件中包二级router-view，而且它的父级为App,里面包含一级router-view
    // 而/about对应的matched为[/about]
    if (record) {
      return h(record.component, data);
    }
    return h();
  }
};
