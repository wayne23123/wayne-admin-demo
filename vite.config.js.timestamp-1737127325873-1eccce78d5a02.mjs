// vite.config.js
import { defineConfig } from "file:///C:/Users/wayne/git/wayne-admin-demo/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/wayne/git/wayne-admin-demo/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { viteMockServe } from "file:///C:/Users/wayne/git/wayne-admin-demo/node_modules/vite-plugin-mock/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\wayne\\git\\wayne-admin-demo";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3YXluZVxcXFxnaXRcXFxcd2F5bmUtYWRtaW4tZGVtb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcd2F5bmVcXFxcZ2l0XFxcXHdheW5lLWFkbWluLWRlbW9cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3dheW5lL2dpdC93YXluZS1hZG1pbi1kZW1vL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5cbi8vIG5vZGUgcGF0aCBcdTZBMjFcdTU4NEEgXHU4NjU1XHU3NDA2XHU4REVGXHU1RjkxXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snO1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgfSxcbiAgfSxcblxuICAvL2h0dHBzOi8vY24udml0ZS5kZXYvY29uZmlnL3NlcnZlci1vcHRpb25zLmh0bWwjc2VydmVyLXByb3h5XG4gIC8vXHU1NzI4IHZpdGUgXHU5MTREXHU3RjZFXHVGRjBDXHU4OUUzXHU2QzdBXHU4REU4XHU1N0RGXHU1NTRGXHU5ODRDXG4gIHNlcnZlcjoge1xuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgLy8gXHU5MDE5XHU4OEUxXHU2NTM5XHU2MjEwIHNyYy9heGlvcy5qcyBcdTVCRUJcdTc2ODQgYmFzZVVSTFxuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuXG4gICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgICBtb2NrUGF0aDogJ21vY2snLCAvLyBcdThBMkRcdTVCOUFcdTZBMjFcdTY0RUNcdTY1NzhcdTY0REFcdTc2ODRcdTZBOTRcdTY4NDhcdTU5M0VcdTU0MERcdTdBMzFcbiAgICAgIGxvY2FsRW5hYmxlZDogdHJ1ZSwgLy8gXHU4QTJEXHU3RjZFXHU2NjJGXHU1NDI2XHU1NzI4XHU2NzJDXHU1NzMwXHU5NThCXHU3NjdDXHU2NjQyXHU1NTVGXHU3NTI4IG1vY2tcbiAgICB9KSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUyxTQUFTLG9CQUFvQjtBQUNsVSxPQUFPLFNBQVM7QUFHaEIsT0FBTyxVQUFVO0FBRWpCLFNBQVMscUJBQXFCO0FBTjlCLElBQU0sbUNBQW1DO0FBU3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUEsRUFJQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUE7QUFBQSxRQUVOLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUVKLGNBQWM7QUFBQSxNQUNaLFVBQVU7QUFBQTtBQUFBLE1BQ1YsY0FBYztBQUFBO0FBQUEsSUFDaEIsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
