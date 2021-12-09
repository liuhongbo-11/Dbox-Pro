import React from 'react';
import * as icons from '@ant-design/icons';

/**
 * @name formatterIconMap
 * @description 批量导入antd design icons 并映射成对象
 * @return {Object} {SmileOutlined:<SmileOutlined />}
 */
const formatterIconMap = () => {
  let iconMap = {};
  for (let key in icons) {
    // 过滤ant-design中的函数 只转化icon
    if (typeof icons[key] !== 'function') {
      iconMap[key] = React.createElement(icons[key]);
    }
  }
  return iconMap;
};
export default formatterIconMap;
