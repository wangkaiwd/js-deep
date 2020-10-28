const Layer = require('./layer');

function Route () {
  this.stack = [];
}

Route.prototype.get = function (handlers) {
  for (let i = 0; i < handlers; i++) {
    const handler = handlers[i];
    const layer = new Layer(null, handler);
    layer.method = 'get';
    this.stack.push(layer);
  }
};
Route.prototype.dispatch = function () {

};

module.exports = Route;
