import BasicLayout from '@/layouts';
import constantRouter from './constantRouter';
import basics from './basics';

// 首页路由
const home = {
  path: '/home',
  meta: { title: '首页', icon: 'home' },
  name: 'index',
  component: '@/pages/home',
};

// url -> 驼峰 key
const getKey = (path = '') => {
  return path.replace(/\/\w{1}/gi, (s) => {
    return s[1].toUpperCase();
  });
};

/**
 * == 路由包装（添加key&permission） ==
 * @param {*} routes  路由数组
 * @param {*} prefix  父级url
 * @returns {*} Array<Object> 包装后的路由列表
 */
export const routerWrap = (routes, prefix = '/') => {
  return routes.map((r) => {
    // meta必须要有（生成菜单用）
    if (!r.meta) r.meta = {};
    const { routes = [], meta } = r;
    // 如果不以斜杆开头&&非http(s)开头则根据父级path拼接
    if (!/^(\/|http(s)?:\/\/)/.test(r.path)) r.path = prefix + '/' + r.path;
    if (!r.key) r.key = getKey(r.path); // 添加key
    if (!r.name) r.name = r.key;
    meta.permission = [r.key]; // 添加permission
    if (routes.length > 0) {
      r.routes = routerWrap(routes, r.path);
      // 当有子路由时默认导航到第一个子路由
      if (!r.redirect) r.redirect = r.routes[0].path;
    }
    return r;
  });
};

/*
 * === 动态路由映射 ===
 */
export const asyncRouterMap = routerWrap([
  home,
  basics,
  // {
  //   path: '/',
  //   key: 'root',
  //   name: 'root',
  //   component: BasicLayout,
  //   meta: { title: '首页' },
  //   redirect: '/home',
  //   routes: [home, basics],
  // },
]);

/*
 * === 静态路由映射 ===
 */
export const constantRouterMap = constantRouter;
