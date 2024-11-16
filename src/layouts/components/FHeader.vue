<script setup>
import { ref, reactive } from 'vue';

import { showModal } from '@/composables/util';

import { logout, updatepassword } from '@/api/manager';

import { toast } from '@/composables/util';

import { useRouter } from 'vue-router';

import { useStore } from 'vuex';

// https://vueuse.org/core/useFullscreen/#usefullscreen
import { useFullscreen } from '@vueuse/core';
import { FullScreen } from '@element-plus/icons-vue';

const { isFullscreen, toggle } = useFullscreen();

const router = useRouter();

const store = useStore();

const showDrawer = ref(false);

const form = reactive({
  oldpassword: '',
  password: '',
  repassword: '',
});

const rules = {
  oldpassword: [
    {
      required: true,
      message: '舊密碼不能為空',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '新密碼不能為空',
      trigger: 'blur',
    },
  ],
  repassword: [
    {
      required: true,
      message: '確認密碼不能為空',
      trigger: 'blur',
    },
  ],
};

const formRef = ref(null);

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }

    isButtonLoading.value = true;

    updatepassword(form)
      .then((response) => {
        toast('修改密碼成功, 請重新登入');

        store.dispatch('logout');

        router.push('/login');
      })
      .finally(() => {
        isButtonLoading.value = false;
      });
  });
};

const handleCommand = (c) => {
  // console.log('c', c)
  switch (c) {
    case 'logout':
      handleLogout();
      break;
    case 'rePassword':
      showDrawer.value = true;
      break;
  }
};

const handleRefresh = () => {
  location.reload();
};

const handleLogout = () => {
  showModal('是否要退出登入').then((res) => {
    // console.log('退出登入')
    logout().finally((res) => {
      // 移除 cookie 裡的 token
      // 清除當前用戶狀態 vuex
      store.dispatch('logout');

      // 跳轉到登入頁面
      router.push('/login');

      // 提示退出登入
      toast('退出登入成功');
    });
  });
};
</script>

<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1"><eleme-filled /></el-icon>
      <span class="ml-2">Wayne 後台</span>
    </span>
    <el-icon class="icon-btn"><fold /></el-icon>

    <el-tooltip effect="dark" content="重新整理" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh"><refresh /></el-icon>
    </el-tooltip>

    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全螢幕" placement="bottom">
        <el-icon class="icon-btn" @click="toggle"
          ><full-screen v-if="!isFullscreen" />
          <aim v-else />
        </el-icon>
      </el-tooltip>

      <!-- https://element-plus.org/zh-CN/component/dropdown.html#dropdown-%E4%B8%8B%E6%8B%89%E8%8F%9C%E5%8D%95 -->
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :icon="UserFilled" />
          <!-- <el-avatar :size="25" :src="$store.state.user.data.data.avatar" /> -->
          {{ $store.state.user.data.data.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密碼</el-dropdown-item>
            <el-dropdown-item command="logout">退出登入</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- {{ $store.state.user }} -->

    <!-- https://element-plus.org/zh-CN/component/drawer.html#drawer-%E6%8A%BD%E5%B1%89 -->
    <el-drawer
      v-model="showDrawer"
      title="修改密碼"
      size="45%"
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :rules="rules" :model="form">
        <!-- <el-form-item> -->
        <el-form-item
          prop="oldpassword"
          label="舊密碼"
          label-width="80px"
          size="small"
        >
          <el-input v-model="form.oldpassword" placeholder="請輸入舊密碼">
          </el-input>
        </el-form-item>

        <!-- <el-form-item> -->
        <el-form-item
          prop="password"
          label="新密碼"
          label-width="80px"
          size="small"
        >
          <el-input
            type="password"
            show-password
            v-model="form.password"
            placeholder="請輸入密碼"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          prop="repassword"
          label="確認密碼"
          label-width="80px"
          size="small"
        >
          <el-input
            type="password"
            show-password
            v-model="form.repassword"
            placeholder="請輸入確認密碼"
          >
          </el-input>
        </el-form-item>

        <!-- <el-form-item>
            <el-input v-model="form.password" placeholder="請輸入密碼" />
          </el-form-item> -->

        <el-form-item>
          <el-button :loading="isButtonLoading" type="primary" @click="onSubmit"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<style scoped>
.f-header {
  height: 64px;
  @apply flex items-center bg-indigo-700 text-slate-50 fixed top-0 left-0 right-0;
}

.logo {
  width: 250px;
  @apply flex items-center justify-center text-xl font-thin;
}

.icon-btn {
  width: 42px;
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>
