// router-view会从父到子进行渲染
export default {
  functional: true,
  render (h, { parent, data }) {
    // console.log(options);
    let depth = 0;
    const route = parent.$route;
    // $vnode: 占位符 vnode
    // 要点：组件渲染从父到子，渲染完后，标记router-view: true
    // 将拥有routerView属性的组件的routerView标记为true,
    // 然后查找拥有该属性的父组件的个数，用来从$route中获取到router-view对应的组件
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.parent;
    }
    data.routerView = true;
    const record = route.matched[depth];
    if (!record) {
      return h();
    }
    return h(record.component, data);
  }
};
