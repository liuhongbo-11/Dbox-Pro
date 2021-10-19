import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styles from './index.less';

const { TextArea } = Input;

/**
 * === 内联编辑允许用户编辑内容而无需导航到单独的编辑屏幕 ===
 * https://www.emgoto.com/react-inline-edit/inline-edit.gif
 * */

const Component = ({ type, ...props }) => {
  return <Fragment>{type === 'multi' ? <TextArea {...props} /> : <Input {...props} />}</Fragment>;
};

// 单行内联编辑 input
const InlineEdit = ({ type, value, setValue, ...props }) => {

  const [editingValue, setEditingValue] = useState(value);

  // 编辑阶段存储value
  const onChange = (ev) => setEditingValue(ev.target.value);

  // 允许用户在按下Enter或Esc键时保存
  const onKeyDown = (ev) => {
     console.log(ev)
    if (ev.key === 'Enter' || ev.key === 'Escape') {
      ev.target.blur();
    }
  };

  // 仅在退出编辑时保存val
  const onBlur = (ev) => {
    ev.target.value && setValue(ev.target.value);
  };

  return (
    <Component
      {...props}
      type={type}
      className={styles.input}
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};

InlineEdit.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired
}

InlineEdit.defaultProps = {
  type: 'simple', // simple单行编辑 multi多行编辑
}

export default InlineEdit;
