// https://umijs.org/config/
import { defineConfig } from 'umi';
import routes from './routes';
import Settings from './defaultSettings';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: 'Ant Design',
    locale: true,
    layout: 'side',
    siderWidth: 208,
    // ...Settings,
  },
  routes,
  fastRefresh: {},
});
