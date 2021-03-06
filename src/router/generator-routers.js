import menu from './menu';
import { getMenuList } from '@/api/user';
import BasicLayout from '@/layouts/index';
import { asyncRouterMap } from './module';
import Routers from '../../config/routes';

console.log('generator rourters', Routers);

// 首页路由
const homeRouter = {
  name: '首页',
  url: '/home',
  code: 'home',
  parentId: 1000,
  icon: 'home',
};

// 获取异步路由配置
const getRouterConf = (routers, [rConf = {}, rComp = {}] = []) => {
  routers.forEach((item) => {
    const { key, routes = [], ...config } = item;
    rComp[key] = item.component;
    rConf[key] = config;
    if (routes.length > 0) getRouterConf(routes, [rConf, rComp]);
  });
  return [rConf, rComp];
};

const [asyncConf, asyncComp] = getRouterConf(asyncRouterMap);

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  // BlankLayout: BlankLayout,
  // RouteView: RouteView,
  // PageView: PageView,
  // home: () => import("@/views/dashboard/Analysis"),
  // 403: () => import(/* webpackChunkName: "error" */ "@/views/exception/403"),
  // 404: () => import(/* webpackChunkName: "error" */ "@/views/exception/404"),
  // 500: () => import(/* webpackChunkName: "error" */ "@/views/exception/500"),
  // 你需要动态引入的页面组件
  ...asyncComp,
};
/**
 * 格式化树形结构数据 生成 react-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map((item, index) => {
    const { [item.key]: rConf = {} } = asyncConf;
    const { meta = {}, ...defRouterConf } = rConf;
    const { title, show, hideChildren, icon } = item.meta || {};

    // 组件地址 文件目录地址需与路由地址一致
    let componentUrl =
      item.path || rConf.path || `${(parent && parent.path) || ''}/${item.key}`;

    // 设置当前router数据
    const currentRouter = {
      ...defRouterConf,
      name: title,
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path:
        rConf.path ||
        item.path ||
        `${(parent && parent.path) || ''}/${item.key}`,
      // 路由名称，建议唯一
      // name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      // component:
      //   constantRouterComponents[item.component || item.key] ||
      //   (() => import(`@/pages/${item.component}`)),

      component: `@/pages${componentUrl}`,
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        ...meta,
        title: title || meta.title,
        icon: icon || undefined,
      },
    };

    // 外链新窗口打开
    if (currentRouter.path.startsWith('http'))
      currentRouter.meta.target = '_blank';

    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true;
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true;
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/');
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect);
    // 是否有子菜单，并递归处理
    if (item.routes && item.routes.length > 0) {
      // Recursion
      currentRouter.routes = generator(item.routes, currentRouter);
    }
    return currentRouter;
  });
};

/**
 * == 动态生成菜单 ==
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    getMenuList()
      .then(({ data }) => {
        let list = data || [];
        const parentId = 1000;
        const routesNav = [];

        // 添加首页路由
        list.unshift(homeRouter);

        // 后端数据, 根级树数组,  根级 PID
        listToTree(list, routesNav, parentId);

        // 路由挂载
        const routers = generator(routesNav);

        console.log('generatorDynamicRouter', routers);
        resolve({
          routers,
        });
      })
      .catch(reject);
  });
};

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach((item) => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const { code, url, name, isHidden, icon, key } = item;
      const child = {
        path: url,
        component: code,
        name: name,
        meta: {
          icon,
          show: !isHidden,
          title: name,
        },
        key: key || code,
        routes: [],
      };

      // 迭代 list 找到当前菜单相符合的所有子菜单
      listToTree(list, child.routes, item.id);

      // 删除不存在routes 值的属性
      if (!child.routes.length) {
        delete child.routes;
      }

      // 加入到树中
      tree.push(child);
    }
  });
};
