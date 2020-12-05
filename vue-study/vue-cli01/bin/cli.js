#!/usr/bin/env node
const commander = require('commander');
const program = new commander.Command();
const pkg = require('../package.json');
/**
 * 将命令后传入的选项处理为对象
 * @param cmd
 * @returns {*}
 */
const getOptions = (cmd) => {
  return cmd.options.reduce((options, cur) => {
    const key = cur.long.slice(2);
    if (cmd[key]) {
      options[key] = cmd[key];
    }
    return options;
  }, {});
};
program
  .name('my-cli')
  .usage('<command> [options]')
  .version(pkg.version);

program
  .command('create <app-name>')
  .description('create a new vue project')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((name, cmd) => {
    const options = getOptions(cmd);
  });
program.parse(process.argv);
