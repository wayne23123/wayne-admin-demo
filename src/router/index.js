import { createWebHistory, createRouter } from 'vue-router';

import index from '@/pages/index.vue';
import Login from '@/pages/Login.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
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
