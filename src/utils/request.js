import axiosInstance from './axios.interceptors';

// 针对axios做二次封装
const request = ({ url, payload, method, options = {} }) => {
  return new Promise((resolve, reject) => {
    // 请求入参处理
    let _payload = method === 'GET' ? { params: payload } : { data: payload };

    axiosInstance({
      url,
      method,
      ..._payload,
      ...options,
    })
      .then((response) => {
        const resData = response.data;
        resData.code === 0 ? resolve(resData) : reject(resData);
      })
      .catch((error) => {
        //error分为 网络error | 接口成功code 不为0  err错误返参格式固定为{code: , data: '', message: ''}
        // TODO 验证网络错误下 error的数据格式
        console.error(error);
        reject(error);
      })
      .finally(() => {});
  });
};
export default request;
