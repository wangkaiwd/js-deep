import axios from 'axios';

/**
 * Axios请求，实现功能如下：
 *  1. 支持axios的所有原有功能
 *  2. 内部设置请求和响应拦截
 *  3. 为请求添加全局loading
 *  4. 当页面切换时取消所有之前页面还在进行的请求(cancel request: xhr.abort())
 */
class Http {
  constructor (config = {}) {
    this.config = {
      timeout: 30000,
      baseURL: 'https://easy-mock.com/mock/5b2e15c2d901cc25e7df4e0c/travel',
      ...config
    };
  }

  _setInterceptor () {
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  request (config) { // 每个请求都是一个axios实例，并且为该实例添加拦截器。这样能做到为每个请求都添加拦截器的功能
    this.instance = axios.create(this.config);
    this._setInterceptor();
    return this.instance.request(config);
  }

  get (url, config = {}) {
    if (!url) {url = '';}
    return this.request({
      url,
      method: 'get',
      ...config
    });
  }

  post (url, config) {
    return this.request({
      url,
      method: 'post',
      ...config
    });
  }
}

const http = new Http();
export default http;
