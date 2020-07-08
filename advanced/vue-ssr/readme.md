## 服务端渲染`SSR`
> [Vue SSR Guide](https://ssr.vuejs.org/guide/)

通读官方文档，文档读完之后再学习

* `SSR`缺陷会占用大量`cpu`和内存
* 客户端渲染可能会出现白屏，通过`SSR`减少白屏时间
* `Vue`的`api`有些不能用，只支持`beforeCreate`,`created`

### 服务端
* 运行`koa`服务
* 服务端使用`Vue`

### `webpack`配置实现`ssr`
* [构建方式图解](https://d2jq2hx2dbkw6t.cloudfront.net/236/vue-ssr.png)
* 实现对应的`webpack`配置
