npm init vite@latest <project-name> – –template vue

-- 引入 element-plus : https://element-plus.org/zh-CN/

npm install element-plus --save

- 在 main.js 引入

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

- 測試

<el-button type="primary">Primary</el-button>
<el-button type="success">Success</el-button>

-- 引入 Tailwind CSS : https://tailwindcss.com/

npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p

- 在 tailwind.config.js 改

  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}", ],

- 在 主要 css 文件引入

@tailwind base;
@tailwind components;
@tailwind utilities;

- 測試

  <div class="text-center p-4 bg-blue-500 text-white">
    <h1 class="text-2xl font-bold">Hello, Tailwind CSS in Vue 3!</h1>
  </div>

-- 設置 @ 為 src 資料夾

- 在 vite.config.js

// node path 模塊 處理路徑
import path from 'path';

resolve: {alias: {'@': path.resolve(\_\_dirname, 'src'),},},

-- 引入 vue router : https://router.vuejs.org/zh/

npm install vue-router@4

- 1. 在 src 下新建 router 資料夾

- 2. 在 router 資料夾下新建 index.js

- 3. 在 2 的 index.js

import { createWebHistory, createRouter } from 'vue-router';

const routes = [];

const router = createRouter({
history: createWebHistory(),
routes,
});

export default router;

- 4. 在 main.js 引入

import router from './router';

app.use(router);

- 5.  在 src 下新建 page 資料夾

- 在 index.vue 配置

<template>
  <div>home</div>
</template>

- 回到 roluter 資料夾的 index.vue 配置

import index from '@/pages/index.vue';

const routes = [
{
path: '/',
name: 'index',
component: index,
},
];

- 到 App.vue 配置

<template>
  <router-view></router-view>
</template>

-- 設定 404 頁面

- 在 router 資料夾下的 index.js

import NotFound from '@/pages/NotFound.vue';

const routes = [ //https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html{path: '/:pathMatch(.*)*', // 放在其他路之後 name: 'NotFound',component: NotFound,},];

--安裝 element-plus icon : https://element-plus.org/zh-CN/component/icon.html

npm install @element-plus/icons-vue

- 使用方法 1. 在 main.js 全局引入

import \* as ElementPlusIconsVue from '@element-plus/icons-vue';

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
app.component(key, component)
}

- 使用方法 2. 組件內引入

import { Search } from '@element-plus/icons-vue';

<el-input v-model="form.username" placeholder="請輸入帳號">
  <template #prefix>
    <el-icon class="el-input__icon"><search /></el-icon>
  </template>
</el-input>
