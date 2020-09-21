const fs = require('fs').promises;
const path = require('path');

async function rmdir (p) {
  const stat = await fs.stat(p);
  if (stat.isDirectory()) {
    const dirs = await fs.readdir(p);
    const fullDirs = dirs.map(dir => rmdir(path.resolve(p, dir)));
    await Promise.all(fullDirs);
    await fs.rmdir(p);
  } else {
    return fs.unlink(p);
  }
}

rmdir('a').then(() => {
  console.log('success');
});
