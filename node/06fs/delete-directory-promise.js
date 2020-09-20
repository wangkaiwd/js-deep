const fs = require('fs').promises;
const path = require('path');

async function rmdir (p) {
  const stat = await fs.stat(p);
  if (stat.isDirectory()) {
    const dirs = fs.readdir(p);
    const fullDirs = dirs.map(dir => path.resolve(dir));
    let index = 0;

    async function next () {
      if (index === fullDirs.length) {
        return fs.rmdir(p);
      }
      const fullDir = fullDirs[index++];
      return await rmdir(fullDir);
    }

    next().then();
  } else {
    return fs.unlink(p);
  }
}

rmdir('a').then(() => {
  console.log('success');
});
