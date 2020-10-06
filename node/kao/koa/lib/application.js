const http = require('http');
const Stream = require('stream');
const EventEmitter = require('events');
const request = require('./request');
const response = require('./response');
const context = require('./context');

// 每个实例和每次请求之间都不会共享request,response,context
class Application extends EventEmitter {
  constructor () {
    super();
    this.callback = undefined;
    // 拷贝request/response/context, 通过原型链进行继承，实现拷贝
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.context = Object.create(context);
    this.middlewares = [];
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
    this.middlewares.push(cb);
  }

  compose (ctx) {
    let index = -1;
    const dispatch = (i) => {
      // index 是 3而i会变成1继续执行
      if (i <= index) {
        return Promise.reject(new Error('next can not called multiple time!'));
      }
      index = i;
      if (i === this.middlewares.length) {return Promise.resolve();}
      const middleware = this.middlewares[i];
      try {
        // Promise.resolve中的参数如果是Promise的话，会等到参数中的所有Promise处理完成后，并返回最终解决后promise的状态，可能是rejected
        // 注意，这里middleware如果在执行过程中出错的话，Promise并不能捕获
        // 因为执行结果会在执行后才放到Promise.resolve中
        // 而在executor中的报错，可以捕获到，因为executor是在Promise内部执行的，如果执行出错，Promise就会在内部调用reject方法
        // 再次调用dispatch时，还会用当前作用域中的i,所以同一个i会调用多次
        return Promise.resolve(middleware(ctx, () => dispatch(i + 1)));
        // 注意：await next()
        //  1. Promise.resolve会等到middleware中的返回的Promise执行完毕才会继续执行
        //  2. Promise.resolve会等到middleware中的await后的Promise执行完毕后，继续执行
      } catch (e) {return Promise.reject(e);}
    };
    return dispatch(0);
  }

  // 每次请求上下文都应该时独立的
  handleRequest (req, res) {
    // 拿到新的ctx
    const ctx = this.createContext(req, res);
    // 对新的ctx进行修改
    this.compose(ctx)
      .then(() => {
        const { body } = ctx;
        res.statusCode = 200;
        if (body == null) {
          res.statusCode = 204;
          res.end('No Content!');
        } else if (typeof body === 'string' || Buffer.isBuffer(body)) {
          res.end(body);
        } else if (typeof body === 'number') {
          res.end(body + '');
        } else if (body instanceof Stream) {
          // 这里的文件名需要动态获取
          res.setHeader('Content-Disposition', 'attachment; filename="filename"');
          body.pipe(res);
        } else if (typeof body === 'object') {
          res.end(JSON.stringify(body));
        } else {
          res.statusCode = 404;
          res.end('Not Found!');
        }
      })
      .catch((e) => {
        console.log('error', e);
        this.emit('error', e);
      });
  }

  listen (...args) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

module.exports = Application;
