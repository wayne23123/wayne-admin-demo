// vite.config.js
import { defineConfig } from "file:///C:/git/wayne-admin-demo/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/git/wayne-admin-demo/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { viteMockServe } from "file:///C:/git/wayne-admin-demo/node_modules/vite-plugin-mock/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\git\\wayne-admin-demo";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  //https://cn.vite.dev/config/server-options.html#server-proxy
  //在 vite 配置，解決跨域問題
  server: {
    proxy: {
      "/api": {
        // 這裡改成 src/axios.js 寫的 baseURL
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "mock",
      // 設定模擬數據的檔案夾名稱
      localEnabled: true
      // 設置是否在本地開發時啟用 mock
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxnaXRcXFxcd2F5bmUtYWRtaW4tZGVtb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcZ2l0XFxcXHdheW5lLWFkbWluLWRlbW9cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L2dpdC93YXluZS1hZG1pbi1kZW1vL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuXHJcbi8vIG5vZGUgcGF0aCBcdTZBMjFcdTU4NEEgXHU4NjU1XHU3NDA2XHU4REVGXHU1RjkxXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIC8vaHR0cHM6Ly9jbi52aXRlLmRldi9jb25maWcvc2VydmVyLW9wdGlvbnMuaHRtbCNzZXJ2ZXItcHJveHlcclxuICAvL1x1NTcyOCB2aXRlIFx1OTE0RFx1N0Y2RVx1RkYwQ1x1ODlFM1x1NkM3QVx1OERFOFx1NTdERlx1NTU0Rlx1OTg0Q1xyXG4gIHNlcnZlcjoge1xyXG4gICAgcHJveHk6IHtcclxuICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgLy8gXHU5MDE5XHU4OEUxXHU2NTM5XHU2MjEwIHNyYy9heGlvcy5qcyBcdTVCRUJcdTc2ODQgYmFzZVVSTFxyXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG5cclxuICAgIHZpdGVNb2NrU2VydmUoe1xyXG4gICAgICBtb2NrUGF0aDogJ21vY2snLCAvLyBcdThBMkRcdTVCOUFcdTZBMjFcdTY0RUNcdTY1NzhcdTY0REFcdTc2ODRcdTZBOTRcdTY4NDhcdTU5M0VcdTU0MERcdTdBMzFcclxuICAgICAgbG9jYWxFbmFibGVkOiB0cnVlLCAvLyBcdThBMkRcdTdGNkVcdTY2MkZcdTU0MjZcdTU3MjhcdTY3MkNcdTU3MzBcdTk1OEJcdTc2N0NcdTY2NDJcdTU1NUZcdTc1MjggbW9ja1xyXG4gICAgfSksXHJcbiAgXSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlAsU0FBUyxvQkFBb0I7QUFDMVIsT0FBTyxTQUFTO0FBR2hCLE9BQU8sVUFBVTtBQUVqQixTQUFTLHFCQUFxQjtBQU45QixJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBLEVBSUEsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBO0FBQUEsUUFFTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFFSixjQUFjO0FBQUEsTUFDWixVQUFVO0FBQUE7QUFBQSxNQUNWLGNBQWM7QUFBQTtBQUFBLElBQ2hCLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
