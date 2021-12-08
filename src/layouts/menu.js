import {
  SmileOutlined,
  FormOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import React from 'react';

// 基础路由
const basicRoutesMap = {
  path: '/',
  routes: [
    {
      path: '/home',
      name: '首页',
      icon: <SmileOutlined />,
      component: './Home',
    },
    {
      path: '/components',
      name: '业务组件展示',
      icon: <AppstoreOutlined />,
      children: [
        {
          path: '/components/simple-form',
          name: '表单查询',
          component: './DisplayComponent/SimpleForm',
        },
      ],
    },
    {
      component: './404',
    },
  ],
};

// 动态路由
const asyncRouterMap = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: '首页',
    icon: <SmileOutlined />,
    component: './Home',
  },
  {
    path: '/components',
    name: '业务组件展示',
    icon: <AppstoreOutlined />,
    routes: [
      {
        path: '/components/simple-form',
        name: '表单查询',
        component: './DisplayComponent/SimpleForm',
      },
    ],
  },
  {
    meta: { title: '基础设置', icon: 'tool' },
    name: '基础设置',
    path: '/basics',
    routes: [
      {
        path: '/basics/warehouse',
        component: './basics/warehouse',
        meta: { title: '仓库管理', icon: undefined },
        name: '仓库管理',
      },
    ],
  },
  {
    component: './404',
  },
];

export { asyncRouterMap, basicRoutesMap };
