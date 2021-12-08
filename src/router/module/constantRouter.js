import UserLayout from '@/layouts/LoginLayout';
import LoginLayout from '../../layouts/LoginLayout';

// 静态路由
const constantRouter = [
  {
    path: '/user',
    component: UserLayout,
    routes: [
      {
        path: '/user/login',
        component: '@/pages/login',
      },
      {
        path: '/404',
        component: '@/pages/404',
      },
      // todo 500, 403
    ],
  },
];

export default constantRouter;
