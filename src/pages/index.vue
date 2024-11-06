<script setup>
//https://vueuse.org/integrations/useCookies/#usecookies
import { useCookies } from '@vueuse/integrations/useCookies';

import { showModal } from '@/composables/util';

const cookie = useCookies();

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

const logout = () => {
   showModal('是否要退出登入').then(res => {
    console.log('退出登入')
   })
}
</script>

<template>
  <div>
    home
    <el-button @click="setCookie">設定 cookie</el-button>
    <el-button @click="getCookie">讀取 cookie</el-button>
    <el-button @click="removeCookie">刪除 cookie</el-button>

    <!-- {{ $store.state.user }} -->
    {{ $store.state.user.data.data.username }}

    <el-button @click='logout'>退出登入</el-button>
  </div>
</template>
