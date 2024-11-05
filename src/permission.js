// 到 main.js 做 import '@/permission';

import router from '@/router';

import { getToken } from '@/composables/auth';

import { toast } from '@/composables/util';

import store from '@/store';

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
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

  // 如果用戶登入了，自動獲取用戶資料，並存在 vuex
  if (token) {
    await store.dispatch('getInfo');
  }

  next();
});
