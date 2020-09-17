const fs = require('fs');
const path = require('path');

// 删除目录: https://excalidraw.com/#json=5624225675083776,DPO3poRDUCBKt7_Sz6nkYw
// 先删除子节点，然后再删除父节点
function rmdirSync (p) {
  const stat = fs.statSync(p);
  if (stat.isDirectory()) {
    const dirs = fs.readdirSync(p);
    dirs.forEach(dir => {
      const currentPath = path.resolve(p, dir);
      rmdirSync(currentPath);
    });
    fs.rmdirSync(p);
  } else {
    fs.unlinkSync(p);
  }
}

rmdirSync('a');


