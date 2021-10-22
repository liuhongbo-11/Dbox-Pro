import React, { useImperativeHandle, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form } from 'antd';

import regExp from '@/utils/regExp';
import { isTypeOf } from '@/utils/utils';
import FieldItem from './FieldItem';

const Simple = ({ fields, formRef, ...props }) => {
  const [form] = Form.useForm();

  const Field = (conf) => useMemo(() => <FieldItem {...conf} />, []);

  // 提交表单之前处理field
  const beforeSubmit = (field) => {
    const formFields = form.getFieldsValue(field);
    // console.log('formFields', formFields);

    // 针对表单字段处理
    return fields.reduce(
      (data, { component, field, props, fieldType = 'string' }) => {
        let val = formFields[field];
        let valType = isTypeOf(val);

        // 过滤空值
        if (
          val === '' ||
          valType === 'undefined' ||
          (valType === 'array' && !val.length)
        ) {
          return data;
        }

        // 去首尾空格
        if (valType === 'string') {
          val = val.trim();
        }
        // 多选模式下切割成数组 规则:(空格|英文逗号)
        if (component === 'Input' && props && props.mode === 'multiple') {
          val = val.split(regExp.division);
        }

        // val为数组统一用英文逗号进行分割
        if (valType === 'array' && /string/gi.test(fieldType)) {
          val = val.join(',');
        }

        // date format
        if (['RangePicker', 'DatePicker', 'TimePicker'].includes(component)) {
          val = moment(val).format(props.format);
        }

        data[field] = val;

        return data;
      },
      {},
    );
  };

  const submit = (field) => {
    const __fields = beforeSubmit(field);
    return Promise.resolve(__fields);
  };

  const reset = (fields) => {
    form.resetFields(fields);
  };

  // 把表单内部方法暴露给外部消费
  useImperativeHandle(formRef, () => {
    return {
      submit,
      reset,
    };
  });

  return (
    <Form form={form} name="simpleForm" {...props}>
      {fields.map((item) => (
        <Form.Item
          label={item.label}
          name={item.field}
          key={item.field}
          {...item}
        >
          <Field conf={item} />
        </Form.Item>
      ))}
    </Form>
  );
};

Simple.propTypes = {
  fields: PropTypes.array.isRequired,
  formRef: PropTypes.object.isRequired,
};

export default Simple;
