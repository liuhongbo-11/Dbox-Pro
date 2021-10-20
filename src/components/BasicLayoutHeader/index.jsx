import React from 'react';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const BasicLayoutHeader = () => {
  return (
    <div className={styles.header}>
      <Avatar />
    </div>
  );
};

export default BasicLayoutHeader;
