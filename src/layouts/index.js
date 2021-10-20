import React, { useState } from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';

import LoginLayout from './LoginLayout';
import HeaderRightContent from '@/components/BasicLayoutHeader';

import __settings from './defaultSettings';
import __props from './defaultProps';

const Layout = ({ location, children }) => {
  const [pathname, setPathname] = useState('/');

  // 自定义菜单项的方法
  const menuItemRender = (item, dom) => {
    return (
      <a
        onClick={() => {
          history.push(item.path);
          setPathname(item.path || '/home');
        }}
      >
        {dom}
      </a>
    );
  };

  // 顶部导航栏渲染方法
  const headerRender = (props) => {};

  // 自定义头右部的 render 方法
  const rightContentRender = () => {};

  const headerTitleRender = () => {
    return '';
  };
  /*
   * 你可能需要针对不同路由输出不同的全局 layout，Umi 不支持这样的配置，
   * 但你仍可以在 src/layouts/index.tsx 中对 location.path 做区分，渲染不同的 layout
   * */
  if (location.pathname === '/login') {
    return (
      <LoginLayout>
        登录布局
        {children}
      </LoginLayout>
    );
  }

  return (
    <ProLayout
      {...__props}
      {...__settings}
      location={{ pathname }}
      menuItemRender={menuItemRender}
      rightContentRender={() => <HeaderRightContent />}
    >
      <PageContainer content={children} />
    </ProLayout>
  );
};

export default Layout;
