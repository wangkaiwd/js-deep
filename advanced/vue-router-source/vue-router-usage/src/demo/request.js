import menuList from './menu';

const request = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(menuList);
    }, 3000);
  });
};

export default request;
