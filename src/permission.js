// 到 main.js 做 import '@/permission';

// 去 main.js 、 router/index.js 做設定
// import router from '@/router';
import { router, addRoutes } from '@/router';

import { getToken } from '@/composables/auth';

import {
  toast,
  showFullScreenLoading,
  hideFullScreenLoading,
} from '@/composables/util';

import store from '@/store';
import { h } from 'vue';

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  // 顯示全屏loading
  showFullScreenLoading();

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

  let hasNewRoutes = false;

  // 如果用戶登入了，自動獲取用戶資料，並存在 vuex
  if (token) {
    // await store.dispatch('getInfo');

    let response = await store.dispatch('getInfo');
    // console.log('response', response);

    let menus = response.data.data.menus;
    // console.log(menus);

    // 動態添加路由
    hasNewRoutes = addRoutes(menus);
  }

  // 設置頁面標題
  // console.log(to);
  let title = to.meta.title ? to.meta.title : '' + 'wayne後台';
  document.title = title;

  // 解決重新整理路由不見的問題
  // https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html#%E6%B7%BB%E5%8A%A0%E8%B7%AF%E7%94%B1
  // next();
  hasNewRoutes ? next(to.fullPath) : next();
});

//https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%90%8E%E7%BD%AE%E9%92%A9%E5%AD%90
// 全局后置钩子
router.afterEach((to, from) => {
  hideFullScreenLoading();
});
