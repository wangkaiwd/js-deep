import axios from 'axios';

export const fetchData = () => {
  return axios.get('/').then(res => res.data).catch(reason => {});
};

export const getNumber = () => 123;
