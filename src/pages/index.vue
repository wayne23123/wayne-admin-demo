<script setup>
//https://vueuse.org/integrations/useCookies/#usecookies
import { useCookies } from '@vueuse/integrations/useCookies';

const cookie = useCookies();

console.log('cookie', cookie);

const setCookie = () => {
  cookie.set('admin-token', '123456');
};

const getCookie = () => {
  console.log(cookie.get('admin-token'));
};

const removeCookie = () => {
  cookie.remove('admin-token');
};
</script>

<template>
  <div>
    home
    <el-button @click="setCookie">設定 cookie</el-button>
    <el-button @click="getCookie">讀取 cookie</el-button>
    <el-button @click="removeCookie">刪除 cookie</el-button>
  </div>
</template>
