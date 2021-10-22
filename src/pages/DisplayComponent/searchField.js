import { Input, Select } from 'antd';
import moment from 'moment';

// 调用服务端数据
const service = new Promise((resolve) => {
  setTimeout(() => {
    // console.log('fetch');
    return resolve([
      {
        key: 0,
        label: '停用',
        value: 0,
      },
      {
        key: 1,
        label: '启用',
        value: 1,
      },
    ]);
  }, 1000);
});

export default [
  {
    label: '编码',
    field: 'code',
    props: {
      mode: 'multiple',
      allowClear: true,
      placeholder: '多个以英文逗号或空格间隔',
    },
    component: 'Input',
  },
  {
    label: '名称',
    field: 'name',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    options: () => {
      return [
        {
          key: 0,
          label: '停用',
          value: 0,
        },
        {
          key: 1,
          label: '启用',
          value: 1,
        },
      ];
    },
  },
  {
    label: '请求字段',
    field: 'status2',
    component: 'Select',
    options: () => service,
  },
  {
    label: '贷款时间',
    field: 'saleTime',
    component: 'DatePicker',
    props: {
      showTime: true,
      // format: 'YYYY-MM-DD HH:mm:ss'
      // format: 'YYYY-MM-DD'
    },
  },
  {
    label: '创建时间',
    field: ['startCreTime', 'endCreTime'],
    component: 'RangePicker',
  },
];
