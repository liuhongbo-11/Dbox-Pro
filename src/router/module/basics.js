// import BlankLayout from '@/layouts/BlankLayout';
import BlankLayout from '../../layouts/BlankLayout';

// 二级子菜单
const routes = [
  {
    path: '/basics/warehouse',
    name: '仓库管理',
    component: '@/pages/basics/warehouse',
    meta: { title: '仓库管理', icon: undefined },
    // routes: [
    //   {
    //     path: 'list',
    //     component: '@pages/basics/warehouse/index',
    //     meta: { title: '仓库列表' },
    //   },
    // ],
  },
];

// 一级菜单
const BasicRouter = {
  path: '/basics',
  name: '基础配置',
  component: BlankLayout,
  meta: { title: '基础设置', icon: 'tool' },
  routes,
};

export default BasicRouter;
