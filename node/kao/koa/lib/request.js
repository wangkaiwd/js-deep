const url = require('url');
const request = {
  get url () {
    return this.req.url;
  },
  get path () {
    return url.parse(this.req.url).pathname;
  }
};

module.exports = request;
