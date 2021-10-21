import { request } from 'umi';

//登录
export async function loginService() {}

// 退出登录
export async function outLogin(options) {
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
