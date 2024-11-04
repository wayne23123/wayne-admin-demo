// 到 main.js 做 import '@/permission';

import router from '@/router';

import { getToken } from '@/composables/auth';

import { toast } from '@/composables/util';

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
// 全局路由守卫
router.beforeEach((to, from, next) => {
  const token = getToken();

  if (!token && to.path !== '/login') {
    toast('請先登入', 'error');

    return next({ path: '/login' });
  }

  // 防止重複登入
  if (token && to.path == '/login') {
    toast('請勿重複登入', 'error');

    return next({ path: from.path ? from.path : '/' });
  }
});
