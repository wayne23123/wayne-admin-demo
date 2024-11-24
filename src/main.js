import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import './index.css';
import App from './App.vue';

// 去 permission.js 、 router/index.js 做設定
// import router from './router';
import { router } from './router';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import store from './store';

// createApp(App).mount('#app');

const app = createApp(App);

app.use(store);

app.use(ElementPlus);

app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

import '@/permission';

import 'nprogress/nprogress.css';

app.mount('#app');
