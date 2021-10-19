import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import InlineEdit from '@/components/InlineEdit';
import { SimpleSearch } from '@/components/SearchForm';
import { Button, Space } from 'antd';
import fields from '../searchField';

const DisplayComponent = () => {
  const formRef = useRef();
  console.log('simple from');

  const handleSubmit = () => {
    formRef.current.submit().then((params) => {
      // do something
      const { saleTime } = params;

      console.log('params', params, saleTime);
      // console.log(moment(saleTime).format('YYYY-MM-DD HH:mm:ss'));
    });
  };

  const handleReset = () => formRef.current.reset();
  return (
    <PageContainer style={{ background: '#fff', height: '100vh' }}>
      <h3>display component</h3>
      <br />
      <SimpleSearch fields={fields} formRef={formRef} />
      <Space>
        <Button
          htmlType="submit"
          type="primary"
          key="submit"
          onClick={handleSubmit}
        >
          提交
        </Button>
        <Button key="reset" onClick={handleReset}>
          重置
        </Button>
        <Button key="cancel">取消配货</Button>
      </Space>
    </PageContainer>
  );
};

export default DisplayComponent;
