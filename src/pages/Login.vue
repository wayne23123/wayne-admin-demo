<script setup>
import { ref, reactive } from 'vue';

import { User, Lock } from '@element-plus/icons-vue';

// import { login, getinfo } from '@/api/manager';
// import { login } from '@/api/manager';

// import { ElNotification } from 'element-plus';
import { toast } from '@/composables/util';

import { useRouter } from 'vue-router';

//https://vueuse.org/integrations/useCookies/#usecookies
import { useCookies } from '@vueuse/integrations/useCookies';

import { setToken } from '@/composables/auth';

import { useStore } from 'vuex';

const router = useRouter();

const cookie = useCookies();

const store = useStore();

const isButtonLoading = ref(false);

const form = reactive({
  username: 'admin',
  password: 'admin',
});

const rules = {
  username: [
    {
      required: true,
      message: '用戶帳號不能為空',
      trigger: 'blur',
    },
    {
      min: 1,
      max: 50,
      message: '用戶名稱長度必須為 1 到 50 之間',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '用戶帳號不能為空',
      trigger: 'blur',
    },
  ],
};

const formRef = ref(null);

const onSubmit = () => {
  formRef.value.validate((valid) => {
    // console.log('valid', valid);
    if (!valid) {
      return false;
    }

    isButtonLoading.value = true;

    store
      .dispatch('login', form)
      .then((response) => {
        toast('登入成功');

        router.push('/');
      })
      .finally(() => {
        isButtonLoading.value = false;
      });
    // login(form.username, form.password)
    //   .then((response) => {
    //     // console.log('response', response);

    //     // 檢查回應碼是否不在 200-299 範圍（表示發生錯誤）
    //     if (response.data.code < 200 || response.data.code >= 300) {
    //       // ElNotification({
    //       //   message: response.data.message || '發生錯誤',
    //       //   type: 'error',
    //       //   duration: 3000,
    //       // });
    //       toast('發生錯誤', 'error');
    //       return;
    //     }

    //     // ElNotification({
    //     //   message: response.data.message || '登入成功',
    //     //   type: 'success',
    //     //   duration: 3000,
    //     // });
    //     toast('登入成功');

    //     // console.log('response.data.data.token', response.data.data.token);
    //     // cookie.set('admin-token', response.data.data.token);
    //     setToken(response.data.data.token);

    //     // // 獲取用戶訊息，改放到 permission.js
    //     // getinfo().then((response) => {
    //     //   // console.log('response', response);
    //     //   store.commit('SET_USERINFO', response.data.data);
    //     // });

    //     router.push({ path: '/' });
    //   })
    //   .catch((error) => {
    //     // console.log('error', error);
    //     // console.log('error.response.data', error.response.data);
    //     // ElNotification({
    //     //   message: error.response.data.msg || '請求失敗',
    //     //   type: 'error',
    //     //   duration: 3000,
    //     // });
    //   })
    //   .finally(() => {
    //     isButtonLoading.value = false;
    //   });
  });
};
</script>

<template>
  <!-- https://element-plus.org/zh-CN/component/layout.html -->
  <div>
    <el-row class="login-container">
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

        <!-- <el-form :model="form" class="w-[250px]"> -->
        <!-- <el-form :rules="rules" :model="form" class="w-[250px]"> -->
        <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
          <!-- <el-form-item> -->
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="請輸入帳號">
              <!-- https://element-plus.org/zh-CN/component/icon.html -->
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <!-- <el-form-item> -->
          <el-form-item prop="password">
            <el-input
              type="password"
              show-password
              v-model="form.password"
              placeholder="請輸入密碼"
            >
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
              :loading="isButtonLoading"
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

<style scoped>
.login-container {
  @apply min-h-screen;
}
</style>
