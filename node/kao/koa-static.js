const fs = require('fs').promises;
const path = require('path');
const koaStatic = (root) => {
  return async (ctx, next) => {
    try {
      const content = await fs.readFile(path.join(root, ctx.path));
      ctx.body = content.toString();
    } catch (e) {
    }
    await next();
  };
};

module.exports = koaStatic;

