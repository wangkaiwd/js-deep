// 高阶函数，方便传参
const koaBodyparser = () => {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      const arr = [];
      ctx.req.on('data', (data) => {
        arr.push(data);
      });
      ctx.req.on('end', () => {
        ctx.request.body = Buffer.concat(arr).toString();
        resolve();
      });
    });
    await next();
  };
};

module.exports = koaBodyparser;
