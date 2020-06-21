import ElMenu from '@/components/el-menu/el-menu';
import ElMenuItem from '@/components/el-menu/el-menu-item';
import ElSubmenu from '@/components/el-menu/el-submenu';
import ReuseMenu from '@/view/reuse-menu';
// {
//   title: '0',
//     key: '0',
//   children: [
//   {
//     key: '0-1',
//     title: '0-1'
//   },
//   {
//     key: '0-2',
//     title: '0-2'
//   },
//   {
//     key: '0-3',
//     title: '0-3',
//     children: [
//       {
//         key: '0-3-1',
//         title: '0-3-2'
//       }
//
//     ]
//   }
// ]
// },
export default {
  name: 'RenderMenu',
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ElMenu,
    ElMenuItem,
    ElSubmenu,
    ReuseMenu
  },
  methods: {
    renderChildren (dataSource) {
      return dataSource.map(item => {
        if (item.children) {
          return this.renderSubmenu(item);
        } else {
          return this.renderMenuItem(item);
        }
      });
    },
    renderMenuItem (item) {
      return <ElMenuItem>{item.title}</ElMenuItem>;
    },
    renderSubmenu (item) {
      return <ElSubmenu title={item.title}>
        {this.renderChildren(item.children)}
      </ElSubmenu>;
    }
  },
  render () {
    return (
      <ElMenu>
        {this.renderChildren(this.dataSource)}
      </ElMenu>
    );
  }
};
