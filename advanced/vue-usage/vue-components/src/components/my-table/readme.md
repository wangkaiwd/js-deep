### Table
* render columns and data
* checkable
  * checkbox indeterminate
    * use dom manipulation to control status of checkbox(other logic)
    * use vue data state control status of checkbox(my logic)
    * When used on elements/components with `v-for`, the registered reference will an Array containing DOM nodes or components instances.
* sort
  * [trick of object reference](https://github.com/wangkaiwd/js-deep/commit/6f50761ff92c72d555a0524e2fc4785cd6522b91#diff-81f55da270cc5907d6f71cca6bce90b7L113-R115)
  * custom sort method
* slot for table item
* fixed header
  * [How to set tbody height with overflow scroll](https://stackoverflow.com/a/23989771)
  * arrange all methods of fixed header
    * 为`table`包裹`div`来设置设置竖直滚动
    * 浅克隆一个新`table`，将旧`table`中的`thead`移动到新`table`中
    * 将新`table`放入到与旧`table`的包裹容器同级的位置
    * 为包裹容器设置高度、溢出滚动
**注意一定要克隆一个新的`table`，如果新创建的话，会导致新创建的`table`无法添加`scoped css`**
