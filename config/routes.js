export default [
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
