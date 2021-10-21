export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    exact: false,
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        exact: true,
        path: '/home',
        component: './Home',
      },
      {
        path: '/components',
        component: './DisplayComponent',
        // 配置子路由
        routes: [
          {
            path: '/components/simple-form',
            component: './DisplayComponent/SimpleForm',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
];
