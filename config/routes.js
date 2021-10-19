export default [
  {
    exact: true,
    path: '/',
    redirect: '/home',
  },
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
      { path: '/simple-form', component: './DisplayComponent/SimpleForm' },
    ],
  },
  {
    component: './404',
  },
];
