import request from '@/utils/request';

/**
 * ==== 登录 ====
 * @param {*} payload
 */
export const loginService = (payload) =>
  request({
    url: '/api/user/login',
    method: 'POST',
    payload,
  });

/**
 * ==== 权限校验 ====
 * @param {*} payload
 */

export const permissionAuth = (payload) =>
  request({
    url: `/api/sso/auth/check?token=${payload.token}`,
    method: 'POST',
  });

// 退出登录
// export async function outLogin(options) {
//   return request('/api/login/outLogin', {
//     method: 'POST',
//     ...(options || {}),
//   });
// }
