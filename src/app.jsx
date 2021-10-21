import { history } from 'umi';

console.log('app.jsx');

// https://umijs.org/zh-CN/docs/runtime-config
// 运行时配置 登录之后最先执行的页面

export function render(oldRender) {
  oldRender();
  // fetch('/api/auth').then((auth) => {
  //   if (auth.isLogin) {
  //     oldRender();
  //   } else {
  //     history.push('/login');
  //     oldRender();
  //   }
  // });
}
