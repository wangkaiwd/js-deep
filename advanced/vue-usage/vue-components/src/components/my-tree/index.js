import MyTree from './my-tree';

const install = (Vue) => {
  Vue.component(MyTree.name, MyTree);
};

export default install;
