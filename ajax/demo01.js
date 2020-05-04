// 倒计时抢购:
//  1. 当前时间要从服务端获取：响应的date请求头，并不用后端单独返回
//  2. 根据请求前和请求后的本地时间来计算大概的请求时间

// 时间差：服务器处理响应并返回的时间 + 响应处理时间
// 这里我们只能计算发起请求到响应结束的时间差，无法得到服务器接收到请求的时间。所以误差会存在。

const deadline = new Date('2020-05-06');
let elapsed = 0;
let targetTime = '';
let timerId = null;
const timerElement = document.querySelector('.count-down');
// 简单封装XMLHttpRequest
const request = (options) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const { url, method = 'GET', data = null } = options;
    xhr.open(method, url);
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr);
      }
    });
    xhr.send(data);
  });
};

const getStartTime = () => {
  const options = { url: './data.json', method: 'HEAD' };
  let startTime = undefined;
  return request(options).then((xhr) => {
    startTime = xhr.getResponseHeader('date');
    elapsed = deadline - new Date(startTime);
  });
};

const calcCountDownTime = () => {
  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed - hours * 60 * 60 * 1000) / (1000 * 60));
  const seconds = Math.floor((elapsed - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000);
  targetTime = [hours, minutes, seconds].map(item => leftPadding(item)).join(':');
};
const leftPadding = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};
const appendToHtml = () => {
  timerElement.innerHTML = targetTime;
};

const startTimer = () => {
  timerId = setInterval(() => {
    elapsed -= 1000;
    if (elapsed <= 0) {
      return clearInterval(timerId);
    }
    calcCountDownTime();
    appendToHtml();
  }, 1000);
};

getStartTime()
  .then(() => {
    calcCountDownTime();
    appendToHtml();
    startTimer();
  });
