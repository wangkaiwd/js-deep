// encapsulate own ajax http request
const ajax = (options) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  const { name, action, file, onError, onProgress, onSuccess } = options;
  // 请求头中会多一个filename
  formData.append(name, file);
  xhr.open('POST', action);
  xhr.send(formData);
  xhr.addEventListener('readystatechange', (e) => {
    // XMLHttpRequest.status http status code of response
    // successful responses(200-299)
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status <= 299) {
      onSuccess(JSON.parse(xhr.response));
    }
  });
  xhr.addEventListener('error', onError);
  xhr.addEventListener('progress', (e) => {
    console.log(e);
  });
  return xhr;
};
export default ajax;
