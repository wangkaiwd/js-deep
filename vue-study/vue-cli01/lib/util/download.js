const downloadGitRepo = require('download-git-repo');
const { promisify } = require('util');
module.exports = promisify(downloadGitRepo);
