import React from 'react';
import route from '../../config/routes';
import {
  SmileOutlined,
  FormOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
// 基础路由
const basicRoutesMap = {
  path: '/user',
  layout: false, //TODO ?
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
};

// TODO 从服务端获取路由列表 动态路由
const asyncRouterMap = {
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
      routes: [
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

export default {
  route: asyncRouterMap,
};
