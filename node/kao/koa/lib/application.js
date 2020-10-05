const http = require('http');
const request = require('./request');
const response = require('./response');
const context = require('./context');

// 每个实例和每次请求之间都不会共享request,response,context
class Application {
  constructor () {
    this.callback = undefined;
    // 拷贝request/response/context, 通过原型链进行继承，实现拷贝
    Object.assign(this, this.copyHttpInfo);
  }

  copyHttpInfo () {
    // 通过原型链可以使用对应的方法，但是在添加新的方法时，会直接添加到自身属性
    let requestSelf = Object.create(request);
    const responseSelf = Object.create(response);
    const contextSelf = Object.create(context);
    return {
      request: requestSelf,
      response: responseSelf,
      context: contextSelf
    };
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
    const { request, response, context } = this.copyHttpInfo();
    context.request = request;
    context.req = request.req = req;
    return context;
  }

  use (cb) {
    this.callback = cb;
  }

  // 每次请求上下文都应该时独立的
  handleRequest (req, res) {
    const ctx = this.createContext(req, res);
    this.callback(ctx);
    //
  }

  listen (...args) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

module.exports = Application;
