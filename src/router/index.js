import { createWebHistory, createRouter } from 'vue-router';

import index from '@/pages/index.vue';
import Login from '@/pages/Login.vue';
import NotFound from '@/pages/NotFound.vue';

import Admin from '@/layouts/admin.vue';

import GoodList from '@/pages/goods/list.vue';

import CategoryList from '@/pages/category/list.vue';

import UserList from '@/pages/user/list.vue';

import OrderList from '@/pages/order/list.vue';

import CommentList from '@/pages/comment/list.vue';

import ImageList from '@/pages/image/list.vue';

import NoticeList from '@/pages/notice/list.vue';

import CouponList from '@/pages/coupon/list.vue';

import SettingBase from '@/pages/setting/base.vue';

import ManagerList from '@/pages/manager/list.vue';

// const routes = [
//   {
//     path: '/',
//     name: 'index',
//     // component: index,
//     component: Admin,
//     // meta: {
//     //   title: 'wayne-后台首页',
//     // },
//     children: [
//       {
//         path: '/',
//         component: index,
//         meta: {
//           title: 'wayne-后台首页',
//         },
//       },

//       {
//         path: '/goods/list',
//         component: GoodList,
//         meta: {
//           title: 'wayne-商品管理',
//         },
//       },

//       {
//         path: '/category/list',
//         component: CategoryList,
//         meta: {
//           title: 'wayne-分类列表',
//         },
//       },
//     ],
//   },

//   {
//     path: '/login',
//     name: 'Login',
//     component: Login,
//     meta: {
//       title: 'wayne-登入页面',
//     },
//   },

//   //https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
//   // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
//   {
//     path: '/:pathMatch(.*)*', // 放在其他路由之后
//     name: 'NotFound',
//     component: NotFound,
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;

// 预设路由，所有用户可见
const routes = [
  {
    path: '/',
    name: 'admin',
    component: Admin,
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'wayne-登入页面',
    },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: index,
    meta: {
      title: 'wayne-后台首页',
    },
  },

  {
    path: '/goods/list',
    name: '/goods/list',
    component: GoodList,
    meta: {
      title: 'wayne-商品管理',
    },
  },

  {
    path: '/category/list',
    name: '/category/list',
    component: CategoryList,
    meta: {
      title: 'wayne-分类列表',
    },
  },

  {
    path: '/user/list',
    name: '/user/list',
    component: UserList,
    meta: {
      title: 'wayne-用户列表',
    },
  },

  {
    path: '/order/list',
    name: '/order/list',
    component: OrderList,
    meta: {
      title: 'wayne-订单列表',
    },
  },

  {
    path: '/comment/list',
    name: '/comment/list',
    component: CommentList,
    meta: {
      title: 'wayne-评价列表',
    },
  },

  {
    path: '/image/list',
    name: '/image/list',
    component: ImageList,
    meta: {
      title: 'wayne-图库列表',
    },
  },

  {
    path: '/notice/list',
    name: '/notice/list',
    component: NoticeList,
    meta: {
      title: 'wayne-公告列表',
    },
  },

  {
    path: '/setting/base',
    name: '/setting/base',
    component: SettingBase,
    meta: {
      title: 'wayne-设定',
    },
  },

  {
    path: '/coupon/list',
    name: '/coupon/list',
    component: CouponList,
    meta: {
      title: 'wayne-优惠券列表',
    },
  },
  {
    path: '/manager/list',
    name: '/manager/list',
    component: ManagerList,
    meta: {
      title: 'wayne-管理员管理',
    },
  },
];

// 去 main.js 、 permission.js 做设定
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 动态添加路由
export function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoute = false;

  const findAndAddRoutesByMenus = (array) => {
    array.forEach((item) => {
      let result = asyncRoutes.find((object) => object.path == item.frontpath);

      // https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html#%E6%9F%A5%E7%9C%8B%E7%8E%B0%E6%9C%89%E8%B7%AF%E7%94%B1
      if (result && !router.hasRoute(result.path)) {
        // https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html#%E6%B7%BB%E5%8A%A0%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1
        router.addRoute('admin', result);
        hasNewRoute = true;
      }
      if (item.child && item.child.length > 0) {
        findAndAddRoutesByMenus(item.child);
      }
    });
  };

  findAndAddRoutesByMenus(menus);

  // console.log('router', router.getRoutes());

  return hasNewRoute;
}
