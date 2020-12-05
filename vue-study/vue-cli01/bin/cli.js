#!/usr/bin/env node
const commander = require('commander');
const program = new commander.Command();
const pkg = require('../package.json');
const chalk = require('chalk');
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
  .version(pkg.version)
  .on('--help', () => {
    // https://github.com/tj/commander.js#custom-help
    console.log('');
    console.log(`Run ${chalk.cyan('mycli <command> --help')} show more detail`);
    console.log('');
  });

program
  .command('create <app-name>')
  .description('create a new vue project')
  .option('-f,--force', 'overwrite target directory if it exists')
  .action((name, cmd) => {
    const options = getOptions(cmd);
  });
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g,--get <path>', 'get value from option')
  .option('-s,--set <key-val-pair...>', 'set value to option')
  .option('-d,--delete <path>', 'delete option from config')
  .action((value, cmd) => {
    console.log('value', value, getOptions(cmd));
  });

program.parse(process.argv);
