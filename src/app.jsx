// 运行时配置 登录之后最先执行的页面https: umijs.org/zh-CN/docs/runtime-config
import { history } from 'umi';
import { permissionAuth } from '@/api/user';

console.log('app 运行时');

// 校验权限
function checkPermission(oldRender) {
  permissionAuth({
    token: '123',
  }).then(({ data }) => {
    if (data.isLogin) oldRender();
    else {
      history.push('/user/login');
      oldRender();
    }
  });
}

// render 页面渲染之前的操作
export function render(oldRender) {
  //每次页面渲染之前做权限验证 检测当前账号的登录状态 可通过token 或者 cookie传给后端进行校验
  checkPermission(oldRender);
}

// console.log('环境变量', process.env);
