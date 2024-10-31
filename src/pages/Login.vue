<script setup>
import { reactive } from 'vue';

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

const onSubmit = () => {
  console.log('submit!');
};
</script>

<template>
  <!-- https://element-plus.org/zh-CN/component/layout.html -->
  <div>
    <el-row style="min-height: 100vh">
      <el-col :span="16" class="flex justify-center items-center bg-indigo-500">
        <div>
          <div class="text-5xl font-bold">歡迎光臨</div>
          <div class="">歡迎來到 Wayne 的後台演示 Demo</div>
          <div>
            本專案使用【vue3 + vite + element-plus】，
            <a href="https://github.com/wayne23123/wayne-admin-demo"
              >git hub 倉庫</a
            >
          </div>
        </div>
      </el-col>
      <!-- 24 - 16 span 配置 8 -->
      <el-col
        :span="8"
        class="flex flex-col justify-center items-center bg-white-50"
      >
        <h2>歡迎回來</h2>
        <div>
          <span></span>
          <span>帳號密碼登入</span>
          <span></span>
        </div>

        <el-form :model="form">
          <el-form-item>
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.name" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">登入</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
