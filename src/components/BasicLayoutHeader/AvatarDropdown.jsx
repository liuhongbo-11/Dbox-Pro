import React, { useCallback } from 'react';
import { Avatar, Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

import HeaderDropdown from '../HeaderDropdown';

import { outLogin } from '@/api/user';
import styles from './index.less';

// 退出登录
const logout = async () => {
  // todo service
  await outLogin();

  const { query = {}, pathname } = history.location;
  const { redirect } = query; // Note: There may be security issues, please note

  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown = () => {
  // TODO 获取个人信息
  const { initialState, setInitialState } = useModel('@@initialState');

  const userInfo = localStorage.getItem('user');
  // console.log('userInfo', userInfo);
  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;
      // TODO 登出
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        logout();
        return;
      }
      // history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          alt="avatar"
        />
        <span className={styles.name}>
          {/*{currentUser.name}*/}
          刘洪博
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
