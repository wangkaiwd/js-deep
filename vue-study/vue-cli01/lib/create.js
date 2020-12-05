const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const { promisify } = require('util');
const rmdir = promisify(fs.rmdir);
const create = async (projectName, options) => {
  // 判断文件夹是否存在，需要和用户进行交互
  // __dirname: 当前模块的目录名
  // process.cwd(): Node.js 进程的当前工作目录
  const dir = path.join(process.cwd(), projectName);
  if (fs.existsSync(dir)) {
    if (options.force) {
      await rmdir(dir, { recursive: true });
    } else {
      // 提示用户是否覆盖
      const answer = await inquirer.prompt([{
        type: 'confirm',
        name: 'overwrite',
        message: 'Target directory has exist, are you overwrite it',
      }]);
      if (answer) {
        await rmdir(dir, { recursive: true });
      }
    }
  } else {
    console.log('create');
  }
};

module.exports = create;
