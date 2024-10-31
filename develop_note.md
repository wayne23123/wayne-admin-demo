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
