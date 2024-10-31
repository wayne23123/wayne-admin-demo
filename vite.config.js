import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// node path 模塊 處理路徑
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  plugins: [vue()],
});
