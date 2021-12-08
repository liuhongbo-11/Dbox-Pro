// 配置型路由 <https://umijs.org/zh-CN/docs/routing>
// import { asyncRouterMap, constantRouterMap } from 'src/router/module';

// 静态路由

// 动态路由
// export default [...asyncRouterMap, ...constantRouterMap];

// export default [
//   {
//     path: '/user',
//     layout: false,
//     routes: [
//       {
//         path: '/user',
//         routes: [
//           {
//             name: 'login',
//             path: '/user/login',
//             component: './User/Login',
//           },
//         ],
//       },
//       {
//         component: './404',
//       },
//     ],
//   },
//   {
//     exact: false,
//     path: '/',
//     component: '@/layouts/index',
//     routes: [
//       {
//         exact: true,
//         path: '/home',
//         component: './Home',
//       },
//       {
//         path: '/components',
//         component: './DisplayComponent',
//         // 配置子路由
//         routes: [
//           {
//             path: '/components/simple-form',
//             component: './DisplayComponent/SimpleForm',
//           },
//         ],
//       },
//       {
//         meta: { title: '基础设置', icon: 'tool' },
//         name: '基础设置',
//         path: '/basics',
//         routes: [
//           {
//             path: '/basics/warehouse',
//             component: './basics/warehouse',
//             meta: { title: '仓库管理', icon: undefined },
//             name: '仓库管理',
//           },
//         ],
//       },
//       {
//         component: './404',
//       },
//     ],
//   },
// ];
