const request = (options) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url);
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            request: xhr,
            message: '请求出错'
          });
        }
      }
    });
    xhr.send(options.data);
  });
};

request({ url: './user1.json', method: 'GET', data: null })
  .then(
    (result) => {
      console.log('result', result);
    },
    (reason) => {
      console.log('reason', reason.message);
    }
  );
