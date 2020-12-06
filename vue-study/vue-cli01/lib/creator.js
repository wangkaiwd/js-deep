const request = require('./util/request');
const ora = require('ora');
const download = require('./util/download');
const { prompt } = require('inquirer');
const path = require('path');
const chalk = require('chalk');

class Creator {
  constructor (dest) {
    this.dest = dest;
  }

  async wrapLoading (fn, tip) {
    const spinner = ora();
    spinner.start(tip);
    const result = await fn();
    spinner.stop();
    return result;
  }

  async fetchRepos (user) {
    const res = await request.get(`/users/${user}/repos`);
    return res.map((item) => item.name);
  }

  async fetchBranches (user, repo) {
    const res = await request.get(`/repos/{user}/${repo}/branches`);
    return res.map((item) => item.name);
  }

  // 从github进行远程下载：调用github api
  async create () {
    const user = await this.inputUser();
    const repo = await this.selectRepo(user);
    const branch = await this.selectBranch(repo);
    await this.wrapLoading(() => this.download(user, repo, branch), 'Download...');
  }

  async inputUser () {
    const { user } = await prompt([
      {
        type: 'input',
        name: 'user',
        message: 'Please input github username',
      }
    ]);
    return user;
  }

  async selectRepo (user) {
    const repos = await this.wrapLoading(() => this.fetchRepos(user), 'Fetching repositories...');
    const { repo } = await prompt([
      {
        type: 'list',
        name: 'repo',
        message: 'Please select a repository',
        choices: repos,
      }
    ]);
    return repo;
  }

  async selectBranch (repo) {
    const branches = await this.wrapLoading(() => this.fetchBranches(user, repo), 'Fetching branches...');
    const { branch } = await prompt([
      {
        type: 'list',
        name: 'branch',
        message: 'Please select a branch',
        choices: branches,
      }
    ]);
    return branch;
  }

  async download (user, repo, branch) {
    try {
      await download(`{user}/${repo}#${branch}`, path.join(process.cwd(), this.dest));
      console.log('');
      console.log(`Download ${chalk.green('successful')}, please cd ./${this.dist} to install npm dependency`);
    } catch (e) {
      console.log('err', e);
    }
  }
}

module.exports = Creator;
