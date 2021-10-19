import ProLayout, { PageContainer } from '@ant-design/pro-layout';

const BasicLayout = (props) => {
  /*
   * 你可能需要针对不同路由输出不同的全局 layout，Umi 不支持这样的配置，
   * 但你仍可以在 src/layouts/index.tsx 中对 location.path 做区分，渲染不同的 layout
   * */
  if (props.location.pathname === '/login') {
    return (
      <div>
        登录布局
        {props.children}
      </div>
    );
  }

  return (
    <ProLayout>
      <PageContainer>hello {props.children}</PageContainer>
    </ProLayout>
  );
};

export default BasicLayout;
