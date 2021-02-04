const less = require('less');
const { getOptions } = require('loader-utils');

function loader (content) {
  const options = getOptions(this);
  const callback = this.async();
  less.render(content, options, (err, output) => {
    callback(err, output.css, output.map);
  });
}

module.exports = loader;
