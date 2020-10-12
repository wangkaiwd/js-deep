const betterBody = () => {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      const arr = [];
      ctx.req.on('data', (chunk) => {
        arr.push(chunk);
      });
      ctx.req.on('end', () => {
        console.log('buffer', Buffer.concat(arr).toString());
        resolve();
      });
    });
    await next();
  };
};

module.exports = betterBody;
