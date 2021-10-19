import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { isTypeOf } from '@/utils/utils';

const CustomSelect = ({ options, ...props }) => {
  const [opts, setOpts] = useState([]);

  useEffect(() => {
    if (isTypeOf(options, 'function')) {
      let ps = options();

      // promise 调用
      if (ps instanceof Promise) {
        ps.then((data) => setOpts(data));
      } else {
        // 正常函数赋值
        setOpts(ps);
      }
    } else {
      // 正常数组赋值
      setOpts(opts);
    }
  }, []);

  return <Select options={opts} {...props} />;
};

CustomSelect.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.instanceOf(Promise)]),
};

export default CustomSelect;
