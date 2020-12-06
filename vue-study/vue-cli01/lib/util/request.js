const axios = require('axios');
const instance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json'
  }
});

instance.interceptors.response.use((res) => {
  return res.data;
}, (err) => {
  return Promise.reject(err);
});

module.exports = instance;
