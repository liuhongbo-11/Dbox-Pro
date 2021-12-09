// https://umijs.org/config/
import { defineConfig } from 'umi';
import routes from './routes';
import DefaultSettings from '../src/layouts/defaultSettings';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  alias: {
    '@': './src',
  },
  // plugins: [['umi-plugin-react'], { dynamicImport: true }],
  // layout: {
  //   name: 'Ant Design',
  //   ...Settings,
  // },
  routes,
  fastRefresh: {},
});
