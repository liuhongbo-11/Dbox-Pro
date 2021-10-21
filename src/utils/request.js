import axios from 'axios';
import { notification, Modal } from 'antd';
export const HTTP_ERROR_STATUS = {
  FORBID: {
    message: '403',
    description: 'Oops！未授权请求',
  },
  UNLOGIN: {
    message: '401',
    description: 'Oops！用户登录认证失败',
  },
  NOTFOUND: {
    message: '404',
    description: 'Oops！访问资源不存在',
  },
  SERVICE: {
    message: '500',
    description: 'Oops！服务器开小差了',
  },
};

// https://zhuanlan.zhihu.com/p/136035219
// 请求或响应错误处理
const handleError = (error) => {
  if (error.response) {
    const { data, status } = error.response;
    const getStatus = (status) => {
      switch (status) {
        case 401:
          Modal.confirm({
            title: '温馨提示',
            closable: false,
            content: '登录失效，请重新登陆！',
            okText: '确定',
            okCancel: false,
            onOk() {
              // store.dispatch("Logout").then(() => window.location.reload()); // 删除token并刷新页面
            },
          });
          return HTTP_ERROR_STATUS.UNLOGIN;
        case 403:
          return HTTP_ERROR_STATUS.FORBID;
        case 404:
          return HTTP_ERROR_STATUS.NOTFOUND;
        default:
          return HTTP_ERROR_STATUS.SERVICE;
      }
    };
    notification.error(getStatus(status));
    return Promise.reject(data);
  }

  return Promise.reject(error);
};

// TODO 基础URL根据环境变量来判别 默认取本本地mock数据
const baseUrl = window.location.origin;

const service = axios.create({
  baseURL: baseUrl,
  timeout: 30000, // 请求超时时间 (30s)
});

service.interceptors.request.use((config) => {
  // 发送之前做的处理
  // const token = Cookies.get(ACCESS_TOKEN);
  // if (token) {
  //   config.headers["Authorization"] = "Bearer " + token; // 让每个请求携带自定义 token 请根据实际情况自行修改
  // }
  return config;
}, handleError);
service.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, handleError);

export default service;
