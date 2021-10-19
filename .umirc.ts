import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    siderWidth: 208,
  },
  routes: [{ path: '/', component: '@/pages/index' }, {path: '/home', component: "@/pages/Home"}],
  fastRefresh: {},
});
