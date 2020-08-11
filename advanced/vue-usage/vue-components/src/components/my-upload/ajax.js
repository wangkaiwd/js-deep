// encapsulate own ajax http request
const ajax = (options) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  const { name, action, file, onError, onProgress, onSuccess } = options;
  // 请求头中会多一个filename
  formData.append(name, file);
  xhr.upload.addEventListener('progress', (e) => {
    e.percent = parseInt(e.loaded / e.total * 100);
    console.log('progress', e);
    onProgress(e);
  });
  xhr.addEventListener('readystatechange', (e) => {
    // XMLHttpRequest.status http status code of response
    // successful responses(200-299)
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status <= 299) {
      console.log('success', xhr);
      onSuccess(JSON.parse(xhr.response));
    }
  });
  xhr.addEventListener('error', onError);
  xhr.open('POST', action);
  xhr.send(formData);
  return xhr;
};
export default ajax;
