<script setup>
//https://vueuse.org/integrations/useCookies/#usecookies
import { useCookies } from '@vueuse/integrations/useCookies';

import { showModal } from '@/composables/util';

import { logout } from '@/api/manager';

import { toast } from '../composables/util';

import { useRouter } from 'vue-router';

import { useStore } from 'vuex';

const cookie = useCookies();

const router = useRouter();

const store = useStore();

// console.log('cookie', cookie);

const setCookie = () => {
  cookie.set('admin-token', '123456');
};

const getCookie = () => {
  console.log(cookie.get('admin-token'));
};

const removeCookie = () => {
  cookie.remove('admin-token');
};

const handleLogout = () => {
  showModal('是否要退出登入').then((res) => {
    // console.log('退出登入')
    logout().finally((res) => {
      // 移除 cookie 裡的 token
      // 清除當前用戶狀態 vuex
      store.dispatch('logout');

      // 跳轉到登入頁面
      router.push('/login');

      // 提示退出登入
      toast('退出登入成功');
    });
  });
};
</script>

<template>
  <div>
    home
    <el-button @click="setCookie">設定 cookie</el-button>
    <el-button @click="getCookie">讀取 cookie</el-button>
    <el-button @click="removeCookie">刪除 cookie</el-button>

    <!-- {{ $store.state.user }} -->
    {{ $store.state.user.data.data.username }}
    <!-- {{ $store.state.user.data.data.menus }} -->
    <!-- {{ $store.state.user.data.data.ruleNames }} -->

    <el-button @click="handleLogout">退出登入</el-button>
  </div>
</template>
