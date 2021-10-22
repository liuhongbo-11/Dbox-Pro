import React, { useRef, useState } from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';

import LoginLayout from './LoginLayout';
import HeaderRightContent from '@/components/BasicLayoutHeader';

import __settings from './defaultSettings';
import { asyncRouterMap, basicRoutesMap } from './menu';
import { Button } from 'antd';
import logo from '@/assets/logo.png';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const Layout = ({ location, children }) => {
  const [pathname, setPathname] = useState('/');
  const [asyncMenu, setAsyncMenu] = useState([]);
  const actionRef = useRef();
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

  const headerTitleRender = () => {};

  const refreshMenu = () => {
    actionRef.current?.reload();
  };

  /*
   * 你可能需要针对不同路由输出不同的全局 layout，Umi 不支持这样的配置，
   * 但你仍可以在 src/layouts/index.tsx 中对 location.path 做区分，渲染不同的 layout
   * */
  if (location.pathname === '/user/login') {
    return <LoginLayout>{children}</LoginLayout>;
  }

  /*二选一
   * 1- 静态路由配置方案
   * route={basicRoutesMap}
   *
   * 2- 动态路由配置方案（从服务端获取）
   * menu={asyncRouterMap}
   * */

  return (
    <ProLayout
      logo={logo}
      {...__settings}
      menu={{
        // loading: true,
        request: async () => {
          await waitTime(2000);
          return asyncRouterMap;
        },
      }}
      actionRef={actionRef}
      location={{ pathname }}
      menuItemRender={menuItemRender}
      rightContentRender={() => <HeaderRightContent />}
    >
      <PageContainer content={children}>
        <Button onClick={refreshMenu}>刷新菜单</Button>
      </PageContainer>
    </ProLayout>
  );
};

export default Layout;
