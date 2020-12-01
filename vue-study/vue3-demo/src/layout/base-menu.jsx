import { reactive } from 'vue';
import routes from '@/router/routes';

// v-model的 jsx用法？

// Vue3 响应式粗浅理解：
// 1. 简单数据类型: ref
// 2. 复杂数组类型： reactive
// 3. 单独使用`reactive`中的值的时候，需要使用`toRefs`对其先进行包装
export default {
  setup () {
    const selectedKeys = reactive([]);
    const renderChildren = function (routes) {
      return routes.map(route => {
        const slots = {
          title () {return <div>{route.name}</div>;}
        };
        return route.children?.length ?
          <a-sub-menu key={route.path} v-slot={slots}>
            {renderChildren(route.children)}
          </a-sub-menu>
          :
          <a-menu-item key={route.path}>{route.name}</a-menu-item>;
      });
    };
    const children = renderChildren(routes);
    console.log('children', children);
    return () => {
      return (
        <a-menu
          theme="dark"
          mode="inline"
          v-model={selectedKeys}
        >
          {children}
        </a-menu>
      );
    };
  }
};
