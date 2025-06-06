import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// node path 模塊 處理路徑
import path from 'path';

import { viteMockServe } from 'vite-plugin-mock';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  //https://cn.vite.dev/config/server-options.html#server-proxy
  //在 vite 配置，解決跨域問題
  server: {
    proxy: {
      '/api': {
        // 這裡改成 src/axios.js 寫的 baseURL
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  plugins: [
    vue(),

    viteMockServe({
      mockPath: 'mock', // 設定模擬數據的檔案夾名稱
      localEnabled: true, // 設置是否在本地開發時啟用 mock
    }),
  ],
});
