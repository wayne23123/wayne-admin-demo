import axios from 'axios';

//https://axios-http.com/zh/docs/instance
const instance = axios.create({
  //   baseURL: 'https://some-domain.com/api/',

  // 在 vite.config 配置後改成
  baseURL: '/api',
});

export default instance;
