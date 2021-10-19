import React, { useEffect, useState, Fragment } from 'react';

import { Input, DatePicker } from 'antd';
import CustomSelect from '@/components/CustomSelect';
import { DATE_PICKER_PROPS } from '../const';
const { RangePicker } = DatePicker;

// datePicker

// rangePicker

const formatter = ({ format, picker }) => {
  console.log('formatter', format);
  if (!format) {
    return 'YYYY-MM-DD HH:mm:ss';
  } else {
    return picker ? DATE_PICKER_PROPS[picker] : format;
  }
};
const FieldItem = ({ conf, ...args }) => {
  const [node, setNode] = useState();
  useEffect(() => {
    const { component, props, options } = conf;

    const __props = Object.assign({ placeholder: '请输入', allowClear: true }, props, args);

    switch (component) {
      case 'Input':
        setNode(<Input {...__props} />);
        break;
      case 'Select':
        setNode(<CustomSelect options={options} {...__props} />);
        break;
      case 'DatePicker':
        let format = formatter(__props);
        console.log(format);
        setNode(<DatePicker {...__props} format={format} />);
        break;
      default:
        setNode(<Input {...__props} />);
    }
  }, []);

  return <Fragment>{node}</Fragment>;
};

export default FieldItem;
