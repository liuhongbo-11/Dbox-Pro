import React, { useEffect, useRef, useState } from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { history } from 'umi';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';
import * as icon from '@ant-design/icons';

import LoginLayout from './LoginLayout';
import HeaderRightContent from '@/components/BasicLayoutHeader';
import routerConf from '../../config/routes';

import __settings from './defaultSettings';
import { generatorDynamicRouter } from '@/router/generator-routers';

import styles from './index.less';
import logo from '@/assets/logo.png';

import formatterIconMap from '@/utils/iconMap';

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
  const menuItemRender = ({ path, meta, ...item }, dom) => {
    return (
      <a
        onClick={() => {
          history.push(path);
          setPathname(path || '/home');
        }}
      >
        {meta.icon && formatterIconMap()[meta.icon]}
        {dom}
      </a>
    );
  };

  // 自定义拥有子菜单菜单项的 render 方法
  const subMenuItemRender = ({ meta }, dom) => (
    <>
      {meta.icon && formatterIconMap()[meta.icon]}
      {dom}
    </>
  );

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
          await waitTime(500);
          // 动态获取菜单
          // const { routers } = await generatorDynamicRouter();
          // return routers;

          //静态路由从 config/routes.js 中获取
          const [constantRouterMap, asyncRouterMap] = routerConf;
          // let result = loopMenuItem(asyncRouterMap.routes);
          // return result;
          return asyncRouterMap.routes;
        },
      }}
      actionRef={actionRef}
      location={{ pathname }}
      menuItemRender={menuItemRender}
      subMenuItemRender={subMenuItemRender}
      rightContentRender={() => <HeaderRightContent />}
    >
      {/*页容器 配置面包屑或者标题*/}
      {/*https://procomponents.ant.design/components/page-container*/}
      <PageContainer> </PageContainer>

      {/*内容*/}
      <div className={styles.page}>
        {children}
        {/*<Button onClick={refreshMenu}>刷新菜单</Button>*/}
      </div>
    </ProLayout>
  );
};

export default Layout;
