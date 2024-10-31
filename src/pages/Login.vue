<script setup>
import { reactive } from 'vue';

import { User, Lock } from '@element-plus/icons-vue';

const form = reactive({
  username: 'admin',
  password: '123456',
});

const onSubmit = () => {
  console.log('submit!');
};
</script>

<template>
  <!-- https://element-plus.org/zh-CN/component/layout.html -->
  <div>
    <el-row style="min-height: 100vh">
      <!-- lg -> 1200px ， md -> 992px ， sm -> 768px ， xs -> 576px -->
      <el-col
        :lg="16"
        :md="12"
        class="flex justify-center items-center bg-indigo-500"
      >
        <div>
          <div class="text-gray-50 text-5xl font-bold pb-4">歡迎光臨</div>
          <div class="text-gray-200 pb-2">歡迎來到 Wayne 的後台演示 Demo</div>
          <div class="text-gray-200">
            本專案使用【vue3 + vite + element-plus】，
            <a href="https://github.com/wayne23123/wayne-admin-demo"
              >git hub 倉庫</a
            >
          </div>
        </div>
      </el-col>
      <!-- 24 - 16 span 配置 8 -->
      <el-col
        :lg="8"
        :md="12"
        class="flex flex-col justify-center items-center bg-white-50"
      >
        <h2 class="text-gray-800 text-3xl font-bold">歡迎回來</h2>
        <div
          class="flex justify-center items-center space-x-2 text-gray-500 my-4"
        >
          <span class="h-[1px] w-16 bg-gray-400"></span>
          <span>帳號密碼登入</span>
          <span class="h-[1px] w-16 bg-gray-400"></span>
        </div>

        <el-form :model="form" class="w-[250px]">
          <el-form-item>
            <el-input v-model="form.username" placeholder="請輸入帳號">
              <!-- https://element-plus.org/zh-CN/component/icon.html -->
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="form.password" placeholder="請輸入密碼">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <!-- <el-form-item>
            <el-input v-model="form.password" placeholder="請輸入密碼" />
          </el-form-item> -->

          <el-form-item>
            <el-button
              round
              color="#626aef"
              type="primary"
              @click="onSubmit"
              class="w-[250px]"
              >登入</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
