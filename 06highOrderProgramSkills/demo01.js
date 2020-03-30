// 在没有模块化的情况下，进行多人协作开发(单例模式)

// 假设有俩个业务模块：商品模块，物流模块

// 为了防止变量干扰，每个都使用自执行函数保护内部的变量

// 没有框架的时候可以这样用：
// 单例设计模式(最原始的模块化思想)：
//  1. 利用闭包机制将元素包起来
//  2. 将外界想要访问的内容通过return返回
// 商品模块
const shopModule = (() => {
  const getList = () => { //获取商品列表

  };

  const getCategory = () => { // 获取商品分类

  };
  return {
    // 这里通过对象返回，如果还有内容需要供外界使用，可以继续为对象提供属性
    getCategory,
  };
})();

// 新闻模块
const newsModule = (() => {
  const getList = () => { // 获取物流信息列表

  };
  // 在这里也想使用商品模块的getCategory:
  //    1. 将getCategory放到全局作用域中，则所有的模块都可以直接使用。但是这样会加大全局变量被污染的概率
  //    2. 在商品模块将要用到的内容返回，并用一个全局变量接收
  shopModule.getCategory();
  return {};
})();
