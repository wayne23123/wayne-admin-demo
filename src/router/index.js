import { createWebHistory, createRouter } from 'vue-router';

import index from '@/pages/index.vue';
import Login from '@/pages/Login.vue';
import NotFound from '@/pages/NotFound.vue';

import Admin from '@/layouts/admin.vue';

import GoodList from '@/pages/goods/list.vue';

import CategoryList from '@/pages/category/list.vue';

// const routes = [
//   {
//     path: '/',
//     name: 'index',
//     // component: index,
//     component: Admin,
//     // meta: {
//     //   title: 'wayne-後台首頁',
//     // },
//     children: [
//       {
//         path: '/',
//         component: index,
//         meta: {
//           title: 'wayne-後台首頁',
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
//           title: 'wayne-分類列表',
//         },
//       },
//     ],
//   },

//   {
//     path: '/login',
//     name: 'Login',
//     component: Login,
//     meta: {
//       title: 'wayne-登入頁面',
//     },
//   },

//   //https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
//   // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
//   {
//     path: '/:pathMatch(.*)*', // 放在其他路由之後
//     name: 'NotFound',
//     component: NotFound,
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;

// 預設路由，所有用戶可見
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
      title: 'wayne-登入頁面',
    },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

// 動態路由，用於匹配菜單動態添加路由
const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: index,
    meta: {
      title: 'wayne-後台首頁',
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
      title: 'wayne-分類列表',
    },
  },
];

// 去 main.js 、 permission.js 做設定
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 動態添加路由
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
