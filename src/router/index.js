import { createWebHistory, createRouter } from 'vue-router';

import index from '@/pages/index.vue';
import Login from '@/pages/Login.vue';
import NotFound from '@/pages/NotFound.vue';

import admin from '@/layouts/admin.vue';

import GoodList from '@/pages/goods/list.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    // component: index,
    component: admin,
    // meta: {
    //   title: 'wayne-後台首頁',
    // },
    children: [
      {
        path: '/',
        component: index,
        meta: {
          title: 'wayne-後台首頁',
        },
      },

      {
        path: '/goods/list',
        component: GoodList,
        meta: {
          title: 'wayne-商品管理',
        },
      },
    ],
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'wayne-登入頁面',
    },
  },

  //https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
  // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
  {
    path: '/:pathMatch(.*)*', // 放在其他路由之後
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(), // 使用 Web History 模式
  routes,
});

export default router;
