// 配置型路由 <https://umijs.org/zh-CN/docs/routing>
// 待优化

// 静态路由
import { SmileOutlined } from '@ant-design/icons';
import React from 'react';

const constantRouterMap = [
  {
    path: '/user',
    component: '@/layouts/LoginLayout',
    routes: [
      {
        path: '/user/login',
        component: './user/login',
      },
      {
        path: '/404',
        component: './404',
      },
      // todo 500, 403
    ],
  },
];

// ===================== 动态路由 =====================
// 首页
const homeRouter = {
  exact: true,
  name: 'home',
  path: '/home',
  component: './Home',
  meta: {
    title: '首页',
    icon: 'SmileOutlined',
  },
};

// 商品信息
const merchandiseRouter = {
  path: '/merchandise',
  name: '商品信息',
  component: '@/layouts/BlankLayout',
  meta: { title: '商品信息', icon: 'GiftOutlined' },
  routes: [
    {
      name: '商品分类',
      path: '/merchandise/classify',
      component: './merchandise/classify',
      meta: { title: '商品分类' },
    },
    {
      name: '铺货管理',
      path: '/merchandise/distribution',
      component: './merchandise/distribution',
      meta: { title: '铺货管理' },
    },
  ],
};

// 基础配置
const basicsRouter = {
  path: '/basics',
  name: '基础配置',
  component: '@/layouts/BlankLayout',
  meta: { title: '基础设置', icon: 'ToolOutlined' },
  routes: [
    {
      name: '仓库管理',
      path: '/basics/warehouse',
      component: './basics/warehouse',
      meta: { title: '仓库管理' },
      // routes: [
      //   {
      //     path: 'list',
      //     component: '@pages/basics/warehouse/index',
      //     meta: { title: '仓库列表' },
      //   },
      // ],
    },
    {
      name: '渠道货主（废弃）',
      path: '/basics/virtualOwner',
      component: './basics/virtualOwner',
      meta: {
        title: '渠道货主（废弃）',
      },
    },
  ],
};

const asyncRouterMap = [homeRouter, basicsRouter, merchandiseRouter];

// ===================== 合并路由菜单 =====================
export default [
  ...constantRouterMap,
  {
    exact: false,
    path: '/',
    component: '@/layouts/index',
    routes: [...asyncRouterMap],
  },
];
// export default [
//   {
//     path: '/user',
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
//         name: 'home',
//         path: '/home',
//         component: './Home',
//       },
//       {
//         name: '业务组件',
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
