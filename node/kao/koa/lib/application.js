const http = require('http');
const request = require('./request');
const response = require('./response');
const context = require('./context');

// 每个实例和每次请求之间都不会共享request,response,context
class Application {
  constructor () {
    this.callback = undefined;
    // 拷贝request/response/context, 通过原型链进行继承，实现拷贝
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.context = Object.create(context);
  }

  // proxy (source, target, key) {
  //   Object.defineProperty(source, key, {
  //     get: () => {
  //       return source[target][key];
  //     }
  //   });
  // }
  //
  // createContext (req, res) {
  //   const { request, response, context } = this.copyHttpInfo();
  //   // context.request = request;
  //   // context.req = request.req = req;
  //   request.req = req;
  //   context.request = request;
  //   // 这里的原型是自己创建的，不会继承Object,所以所有属性都是自己自定义的
  //   for (const key in request) {
  //     this.proxy(context, 'request', key);
  //   }
  //   return context;
  // }
  createContext (req, res) {
    // 请求的时候需要在次拷贝一次
    const request = Object.create(this.request);
    const response = Object.create(this.response);
    const context = Object.create(this.context);
    context.request = request;
    context.req = request.req = req;
    context.response = response;
    context.res = response.res = res;
    return context;
  }

  use (cb) {
    this.callback = cb;
  }

  // 每次请求上下文都应该时独立的
  handleRequest (req, res) {
    // 拿到新的ctx
    const ctx = this.createContext(req, res);
    // 对新的ctx进行修改
    this.callback(ctx);
    res.end(ctx.body);
  }

  listen (...args) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

module.exports = Application;
