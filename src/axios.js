import axios from 'axios';

// import { ElNotification } from 'element-plus';
import { toast } from '@/composables/util';

// import { useCookies } from '@vueuse/integrations/useCookies';
import { getToken } from '@/composables/auth';

//https://axios-http.com/zh/docs/instance
const instance = axios.create({
  //   baseURL: 'https://some-domain.com/api/',

  // 在 vite.config 配置後改成
  baseURL: '/api',
});

//https://axios-http.com/zh/docs/interceptors
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么

    // 往 header 中添加 token
    // const cookie = useCookies();
    // const token = cookie.get('admin-token');

    const token = getToken();

    if (token) {
      config.headers['token'] = token;
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    // ElNotification({
    //   message: error.response.data.msg || '請求失敗',
    //   type: 'error',
    //   duration: 3000,
    // });
    toast(error.response.data.msg || '請求失敗', 'error', true);

    return Promise.reject(error);
  }
);

export default instance;
